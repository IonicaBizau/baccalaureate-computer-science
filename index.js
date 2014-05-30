var Request = require("request")
  , Fs = require("fs")
  ;

const DOWNLOAD_DIR = __dirname + "/downloaded";

function padNumber (n) {
    n = n.toString();
    while (n.length < 3) {
        n = "0" + n;
    }
    return n;
}

for (var year = 2008; year <= 2009; ++year) {
    for (var i = 1; i <= 100; ++i) {
        var s = "";
        for (var j = 1; j < 4; ++j) {
            s += "i";

            var padded = padNumber(i)
              , name = "BAC_" + year + "_NR" + padded + "_S" + j + ".pdf"
              , url = "http://bacinfo.cnlr.ro/subiecte-bac/" + year + "/"
              ;

            if (year === 2008) {
                //      e_informatica_intensiv_c_i_001.pdf
                url += "e_informatica_intensiv_c_" + s + "_" + padded + ".pdf"
            } else if (year === 2009) {
                //      e_info_intensiv_c_siii_001.pdf
                url += "e_info_intensiv_c_s" + s + "_" + padded + ".pdf"
            }


            (function (url, name) {
                Request(url, function (err, response, body) {
                    if (err || response.statusCode !== 200) {
                        return console.log("ERR: Failed to download: " + name + " from " + url);
                    }
                    console.log("Downloaded " + name + " from " + url);
                }).pipe(Fs.createWriteStream(DOWNLOAD_DIR + "/" + name));
            })(url, name);
        }
    }
}
