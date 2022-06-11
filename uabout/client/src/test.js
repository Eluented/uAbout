const arr = [
    {
        "email": "jeffy@outlook.com",
        "first_name": "Jeff",
        "last_name": "Bezos",
        "phone_number": "051232130123",
        "username": "Jeffy"
    },
    {
        "email": "bruh@hotmail.com",
        "first_name": "asdas",
        "last_name": "saddsa",
        "phone_number": "12321323",
        "username": "Jeffy"
    },
    {
        "email": "libby@hotmail.com",
        "first_name": "Libby",
        "last_name": "Sprack",
        "phone_number": "4123125",
        "username": "Jeffy"
    },
    {
        "email": "robyn@hotmail.com",
        "first_name": "Robyn",
        "last_name": "Short",
        "phone_number": "41235661",
        "username": "Jeffy"
    },
    {
        "email": "andrew@hotmail.com",
        "first_name": "Andrew",
        "last_name": "Ken",
        "phone_number": "58912930123",
        "username": "Jeffy"
    }
]

arr.map((data, idx) => (
    console.log(data.username, data.first_name, data.last_name, idx)
    ))