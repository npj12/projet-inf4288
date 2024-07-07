module.exports = (req, res, next) => {

    const params = [
        'region', 'departement', 'arrondissement', 'numeroActe',
        'nomEnfant', 'dateNaissanceEnfant', 'lieuNaissanceEnfant', 'sexe',
        'nomPere', 'lieuNaissancePere', 'residencePere', 'professionPere',
        'nomMere', 'lieuNaissanceMere', 'dateNaissanceMere', 'residenceMere', 'professionMere',
        'dresseLe', 'surLaDeclarationDe1', 'surLaDeclarationDe2', 'parNous1', 'parNous2', 'etatCivilCentreDe', 'assisteDe'
    ];

    const undefinedVars = [];
    params.forEach(param => {
        if (req.body[param] === undefined) {
            undefinedVars.push(param);
        }
    });
    
    if (undefinedVars.length > 0) {
        const jsonResponse = {error:`Les paremetres suivant sont obligatoires: ${undefinedVars.join(', ')}`, request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else {
        return next();
    }
}