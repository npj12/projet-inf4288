const  readline = require('readline');
const fs = require('fs');
const { log } = require('console');
async function importLeven() {
    const leven = await import('leven');
    return leven.default;
  }


let motExiste = (mot, chemin) => {
    return new Promise((resolve, reject) => {
        const interfaceLecture = readline.createInterface({
            input: fs.createReadStream(chemin),
            console: false
        });

        let resultat = false;

        interfaceLecture.on('line', function(ligne) {
            if (mot.toUpperCase() === ligne.toUpperCase()) {
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

let correct = async (mot, chemin) => {
    try {
        mot = mot.toUpperCase().trim();
        const existe = await motExiste(mot, chemin);
        if (existe) {
            return mot;
        } else {
            const dictionnaire = await getDictionnaire(chemin);
            let distanceMin = Infinity;
            let candidats = [];

            const leven = await importLeven();
            dictionnaire.forEach(dictMot => {
                const distance = leven(mot, dictMot);
                if (distance < distanceMin) {
                    distanceMin = distance;
                    candidats = [dictMot];
                } else if (distance === distanceMin) {
                    candidats.push(dictMot);
                }
            });

            // Appliquer l'heuristique : choisir le mot avec le plus de caractères communs
            let maxCaracteresCommuns = -1;
            let meilleurMatch = '';

            candidats.forEach(candidat => {
                const caracteresCommuns = compterCaracteresCommuns(mot, candidat);
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

let correctNom = async (nomComplet, chemin) => {
    const noms = nomComplet.split(' ');
    let resultat = '';

    for (const nom of noms) {
        resultat += await correct(nom, chemin) + ' ';
    }

    return resultat.trim();
}

let addToDict = async (mot, cheminVersLeDict) => {
    if(!await motExiste(mot, cheminVersLeDict) ){
        fs.appendFile(cheminVersLeDict, `${mot}\n`, (error) => {
            if(error){
                console.error('Erreur lors de l\'ajout de contenu au fichier:', error);
            }
        })
    }
}

module.exports = { 
    correct,
    correctNom,
    addToDict
};

