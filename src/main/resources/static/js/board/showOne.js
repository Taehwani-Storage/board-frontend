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

})

function print(resp) {
    let data = resp.boardDTO
    $('title').text(data.id + "번 게시글")
    $('#td-title').text(data.title)
    $('#td-nickname').text(data.nickname)
    $('#td-entryDate').text(data.entryDate)
    $('#td-modifyDate').text(data.modifyDate)
    $('#td-content').text(data.contennt)
}