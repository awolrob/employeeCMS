const persons = [
    { firstname: "Malcom", lastname: "Reynolds" },
    { firstname: "Kaylee", lastname: "Frye" },
    { firstname: "Jayne", lastname: "Cobb" }
];


function getFullName(item) {
    var newArr= {};
    newArr.name = item.firstname;
    newArr.value= item.lastname;
    return newArr;

}

console.log(persons.map(getFullName));
