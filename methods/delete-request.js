const writeToFile = require("../util/write-to-file")
module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    // const regexV4 = new RegExp(
    //     /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    // );

    // if (!regexV4.test(id)) {
    //     res.writeHead(400, { "Content-Type": "application/json" });
    //     res.end(
    //         JSON.stringify({
    //             title: "Validation Failed",
    //             message: "UUID is not valid",
    //         })
    //     );
    // } else 
    if (baseUrl == "/api/expenses/" && id) {
        const index = req.expenses.findIndex((exp) => {
            return exp.id === id;
        });
        // console.log("Index", index)
        if (index === -1) {
            res.statusCode = 404;
            res.write(
                JSON.stringify({ title: "Not Found", message: "Movie not found" })
            );
            res.end();
        } else {
            req.expenses.splice(index, 1);
            console.log("Espenses", req.expenses)
            writeToFile(req.expenses);
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.expenses));
        }
    } else {
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(
            JSON.stringify({
                "title": "Route not found",
                "message": "No route found"
            })
        )

    }
}