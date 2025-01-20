$().ready(() => {
    $('#input-content').summernote({
        height: 300
    })

    $('#div-btn-insert').on('click', e => {
        // 제목이 입력되었는지 확인
        let title = $('#input-title').val()
        if(title == '') {
            Swal.fire({
                title: '제목은 반드시 입력해야 합니다.',
                icon: 'error'
            }).then(()=>{
                $('#input-title').focus()
            })
            return;
        }
        // 내용이 입력되었는지 확인
        let content = $('#input-content').summernote('code')
        if(content === '<p><br></p>') {
            Swal.fire({
                title: '내용은 반드시 입력해야 합니다.',
                icon: 'error'
            }).then(()=>{
                $('#input-content').focus()
            })
            return;
        }

        // 전부 입력이 될 때만 입력 누르기
        let logIn = JSON.parse(sessionStorage.getItem("logIn"))
        let boardDTO = {
            'title': title,
            'content': content,
            'writerId': logIn.id
        }

        $.ajax({
            contentType: 'application/json;charset=UTF-8',
            url: 'http://localhost:8080/api/board/write',
            type: 'POST',
            data: JSON.stringify(boardDTO),
            success: (resp) => {
                location.href=`/board/showOne/${resp.boardDTO.id}`
            }
        })
    })
})