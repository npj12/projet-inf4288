exports.getAllRegions = (req, res, next)=>{
    const jsonResponse = [
        'Adamaoua', 
        'Center', 
        'East', 
        'Extreme nord', 
        'Littoral', 
        'Ngaoundere', 
        'Nord', 
        'Nord-West', 
        'West', 
        'South-West'
    ]
    console.log(jsonResponse);
    return res.status(200).json(jsonResponse);
}