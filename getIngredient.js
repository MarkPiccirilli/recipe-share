apikey = "2e6e42714a49946a628cd94d888b9fcf";
apiid = "f4784748";

module.exports = function() {
    console.log("test s");
    var http = require("http");

    http.createServer(function(req, res) {
        var q = url.parse(req.url, true).query;
        console.log("q.newIngredient: " + q.newIngredient);
        var apireq = new XMLHttpRequest();
        apireq.open('GET', 'https://api.nutritionix.com/v1_1/search/' + q.newIngredient + '?results=0:1&fields=item_name,nf_serving_size_qty,nf_serving_size_unit,nf_calories,nf_total_fat,nf_colesterol,nf_sodium,nf_total_carbohydrate,nf_sugars,nf_protein&appId=' + apiid + '&appKey=' + apikey, true);
        apireq.addEventListener("load", function() {
            if(apireq.status >= 200 && apireq.status <= 400) {
                console.log("respond test");
                res.wirteHead(200, {"Content-Type": "text/plain"});
                res.write(req.responseText);
                res.end(req.responseText);
            }
            else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(null);
        event.preventDefault();
    }).listen(8080);
    return http;
}(); 