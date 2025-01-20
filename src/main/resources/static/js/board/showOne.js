$().ready(() => {
    let url = window.location.href
    let boardId = url.substring(url.lastIndexOf('/') + 1)

    $.ajax({
        url: `http://localhost:8080/api/board/showOne/${boardId}`,
        success: (resp) => {
            print(resp)
        }
    })

    let logIn = JSON.parse(sessionStorage.getItem('logIn'))

    $.ajax({
        url: `http://localhost:8080/api/reply/showAll/${boardId}`,
        success: (resp) => {
            printReply(resp.list)
        }
    })

    $('#btn-insert-reply').on('click', (e) => {
        let content = $('#input-new-reply').val()
        let boarDTO = {
            'content': content,
            'boardId': parseInt(boardId),
            'writerId': logIn.id
        }
        $.ajax({
            contentType: 'application/json;charset=UTF-8',
            url: 'http://localhost:8080/api/reply/write',
            type: 'POST',
            data: JSON.stringify(boarDTO),
            success: (resp) => {
                window.location.reload()
            }
        })
    })



    $('#btn-update-board').on('click', e => {
        let titleUpdate = document.createElement('input')
        $(titleUpdate).addClass('form-control')
        $(titleUpdate).attr('id', 'input-title')
        $(titleUpdate).val($('#td-title').text())

        $('#td-title').text('')
        $('#td-title').append(titleUpdate)

        let content = $('#td-content').html()

        let summernote = document.createElement('div')
        $('#td-content').text('')
        $('#td-content').append(summernote)
        $(summernote).summernote('code', content)

        $('#btn-update-board').hide()
        $('#btn-delete-board').hide()

        let btnUpdateFinal = document.createElement('button')
        $(btnUpdateFinal).addClass('btn btn-info')
        $(btnUpdateFinal).text('수정하기')
        $(btnUpdateFinal).on('click', e => {
            let boardDTO = {
                title: $(titleUpdate).val(),
                content: $(summernote).summernote('code'),
                id: boardId
            }

            console.log(boardDTO)

            $.ajax({
                contentType: 'application/json;charset=UTF-8',
                url: 'http://localhost:8080/api/board/update',
                type: 'POST',
                data: JSON.stringify(boardDTO),
                success: (resp) => {
                    location.reload()
                }

            })
        })
        $('#td-content').append(btnUpdateFinal)
    })

    $('#btn-delete-board').on('click', e => {
        Swal.fire({
            title: '!!! 경고 !!!',
            text: '정말로 삭제하시겠습니까?',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: "네",
            denyButtonText: "아니오"
        }).then(result => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `http://localhost:8080/api/board/delete/${boardId}`,
                    success: () => {
                        Swal.fire({
                            text: "삭제되었습니다.",
                            icon: 'success'
                        }).then(() => {
                            location.href = '/board/showAll/1'
                        })
                    }
                })
            }

        })
    })
})

function printReply(list) {
    let logIn = JSON.parse(sessionStorage.getItem('logIn'))

    list.map((item, index, list) => {
        if (logIn.id != item.writerId) {
            printOthersReply(item)
        } else {
            printMyReply(item, index)
        }
    })
}

function printMyReply(item, index) {
    let tr = document.createElement('tr')

    let nicknameTd = document.createElement('td')
    $(nicknameTd).text(item.nickname)
    $(tr).append(nicknameTd)

    let inputTd = document.createElement('td')
    let replyInput = document.createElement('input')
    $(replyInput).addClass('form-control')
    $(replyInput).attr('id', 'reply-input' + index)
    $(replyInput).val(item.content)
    $(inputTd).append(replyInput)
    $(tr).append(inputTd)

    let updateTd = document.createElement('td')
    let updateButton = document.createElement('button')
    $(updateButton).text('수정')
    $(updateButton).addClass('btn btn-outline-info')
    $(updateButton).on('click', e => {
        let updatingContent = $('#reply-input' + index).val()
        let updatingData = {
            'content': updatingContent,
            'id': item.id
        }

        $.ajax({
            contentType: 'application/json;charset=UTF-8',
            url: 'http://localhost:8080/api/reply/update',
            type: 'POST',
            data: JSON.stringify(updatingData),
            success: (resp) => {
                location.reload()
            }
        })
    })

    $(updateTd).append(updateButton)
    $(tr).append(updateTd)

    let deleteTd = document.createElement('td')
    let deleteButton = document.createElement('button')
    $(deleteButton).addClass('btn btn-outline-danger')
    $(deleteButton).text('삭제')
    $(deleteButton).on('click', e => {
        $.ajax({
            url: `http://localhost:8080/api/reply/delete/${item.id}`,
            success: (resp) => {
                location.reload()
            }
        })
    })

    $(deleteTd).append(deleteButton)
    $(tr).append(deleteTd)

    $('#tbody-reply').append(tr)
}

function updateReply(index) {
    console.log(index)
}

function printOthersReply(item) {
    let tr = document.createElement('tr')
    let nicknameTd = document.createElement('td')
    $(nicknameTd).text(item.nickname)
    $(tr).append(nicknameTd)

    let contentTd = document.createElement('td')
    let contentInput = document.createElement('input')
    $(contentInput).addClass('form-control')

    $(contentTd).text(item.content)
    $(contentTd).attr('colspan', '3')
    $(tr).append(contentTd)
    let dateTd = document.createElement('td')

    // 날짜 format 하기
    let date = item.modifyDate > item.entryDate ? item.modifyDate : item.entryDate
    let formmatted = date.substring(0, 10)
    $(dateTd).text(formmatted)
    $(tr).append(dateTd)

    $('#tbody-reply').append(tr)
}

function print(resp) {
    let data = resp.boardDTO
    $('title').text(data.id + "번 게시글")
    $('#td-title').text(data.title)
    $('#td-nickname').text(data.nickname)
    $('#td-entryDate').text(data.formattedEntryDate)
    $('#td-modifyDate').text(data.formattedModifyDate)
    $('#td-content').html(data.content)
}