function validate() {
    let a = document.forms["myForm"]["name"].value;
    let labels = document.getElementsByTagName('label');
    let popup = document.getElementsByClassName('popup')[0];
    document.querySelectorAll('.error').forEach(e => e.remove());

    if (a === "") {
        let p = document.createElement('p');
        p.innerHTML = "Укажите ваше имя!";
        p.className = 'error'
        p.style.color = 'red';
        labels[0].append(p);
    }
    let b = document.forms["myForm"]["deliveryAddress"].value;
    if (b === "") {
        let p = document.createElement('p');
        p.innerHTML = "Укажите ваш адрес!";
        p.className = 'error'
        p.style.color = 'red';
        labels[1].append(p);
    }
    let c = document.forms["myForm"]["phone"].value;
    if (c === "") {
        let p = document.createElement('p');
        p.innerHTML = "Укажите ваш телефон!";
        p.className = 'error'
        p.style.color = 'red';
        labels[2].append(p);
    }

    if (!document.querySelectorAll('.error').length) {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'post',
            body: JSON.stringify({name: a, address: b, phone: c}),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                const {name, address, phone} = json;
                popup.style.display = 'block';
                console.log(json);
                let nameDom = document.createElement('p');
                let addressDom = document.createElement('p');
                let phoneDom = document.createElement('p');
                nameDom.innerHTML = name;
                addressDom.innerHTML = address;
                phoneDom.innerHTML = phone;
                popup.appendChild(nameDom)
                popup.appendChild(addressDom)
                popup.appendChild(phoneDom)
                popup.addEventListener('click', () => {
                    popup.style.display = 'none';
                    nameDom.innerHTML = null;
                    addressDom.innerHTML = null;
                    phoneDom.innerHTML = null;
                })
            })
    }
}
