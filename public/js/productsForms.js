
    
    const addDescriptionBtn = document.getElementById('addDescriptionBtn');
    const descriptionList = document.querySelector('.descriptionList');
    const descriptionInput = document.querySelectorAll('.descriptionInput')[0];
    
    addDescriptionBtn.addEventListener('click', function() {
        let newDescription = descriptionInput.cloneNode(true);
        let input = newDescription.getElementsByTagName('textarea')[0];
        input.value = ' ';
        descriptionList.appendChild(newDescription);
    });

    const addDetailBtn = document.getElementById('addDetailBtn');
    const detailList = document.querySelector('.detailList');
    const detailInput = document.querySelectorAll('.detailInput')[0];

    addDetailBtn.addEventListener('click', function() {
        let newDetail = detailInput.cloneNode(true);
        let input = newDetail.getElementsByTagName('input')[0];
        input.value = ' ';
        detailList.appendChild(newDetail);
    });

