const  readline = require('readline');
const fs = require('fs');
async function importLeven() {
    const leven = await import('leven');
    return leven.default;
  }


let nomExiste = (nom, chemin) => {
    return new Promise((resolve, reject) => {
        const interfaceLecture = readline.createInterface({
            input: fs.createReadStream(chemin),
            console: false
        });

        let resultat = false;

        interfaceLecture.on('line', function(ligne) {
            if (nom.toUpperCase() === ligne.toUpperCase()) {
                resultat = true;
                interfaceLecture.close();
            }
        });

        interfaceLecture.on('close', function() {
            resolve(resultat);
        });

        interfaceLecture.on('error', function(err) {
            reject(err);
        });
    });
};

let getDictionnaire = (chemin) => {
    return new Promise((resolve, reject) => {
        const interfaceLecture = readline.createInterface({
            input: fs.createReadStream(chemin),
            console: false
        });

        let dictionnaire = [];

        interfaceLecture.on('line', function(ligne) {
            dictionnaire.push(ligne);
        });

        interfaceLecture.on('close', function() {
            resolve(dictionnaire);
        });

        interfaceLecture.on('error', function(err) {
            reject(err);
        });
    });
};

let compterCaracteresCommuns = (str1, str2) => {
    let caracteresCommuns = new Set([...str1].filter(char => str2.includes(char)));
    return caracteresCommuns.size;
};

let correct = async (nom, chemin) => {
    try {
        nom = nom.toUpperCase();
        const existe = await nomExiste(nom, chemin);
        if (existe) {
            return nom;
        } else {
            const dictionnaire = await getDictionnaire(chemin);
            let distanceMin = Infinity;
            let candidats = [];

            const leven = await importLeven();
            dictionnaire.forEach(mot => {
                const distance = leven(nom, mot);
                if (distance < distanceMin) {
                    distanceMin = distance;
                    candidats = [mot];
                } else if (distance === distanceMin) {
                    candidats.push(mot);
                }
            });

            // Appliquer l'heuristique : choisir le mot avec le plus de caractères communs
            let maxCaracteresCommuns = -1;
            let meilleurMatch = '';

            candidats.forEach(candidat => {
                const caracteresCommuns = compterCaracteresCommuns(nom, candidat);
                if (caracteresCommuns > maxCaracteresCommuns) {
                    maxCaracteresCommuns = caracteresCommuns;
                    meilleurMatch = candidat;
                }
            });

            const corrige = meilleurMatch;
            return corrige;
        }
    } catch (err) {
        console.error(err);
    }
};

let correctName = async (nomComplet, chemin) => {
    const noms = nomComplet.split(' ');
    let resultat = '';

    for (const nom of noms) {
        resultat += await correct(nom, chemin) + ' ';
    }

    return resultat.trim();
}


module.exports = { 
    correct,
    correctName
};

