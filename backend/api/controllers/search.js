
exports.get_search = (req, res, next) => {
    const { region, departement, arrondissement, numeroActe, nom } = req.query;
    const values = [region, departement, arrondissement, numeroActe, nom];
    const query = `
        SELECT *
        FROM acte_de_naissance
        WHERE region ILIKE '%' || $1 || '%'
        AND departement ILIKE '%' || $2 || '%'
        AND arrondissement ILIKE '%' || $3 || '%'
        AND numero_acte ILIKE '%' || $4 || '%'
        AND nom ILIKE '%' || $5 || '%';
    `;
    console.log(query);
    return res.status(200).json({
        nbActes: 2,
        actes: [
            {
                region: 'Region',
                cheminVersActe: 'https://Un_chemin_valide'
            },
            {
                region: 'Region',
                cheminVersActe: 'https://Un_autre_chemin_valide'
            }
        ]
    })
}