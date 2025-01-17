$().ready (() => {
        // 로그인 버튼을 누르면 jQuery의 ajax를 사용해 로그인 시도.
        $('#btn-logIn').on('click', e => {
            let username = $('#input-username').val()
            let password = $('#input-password').val()

            if (username === '' || password === '') {
                alert('로그인 정보 중 입력 안된 정보가 있습니다.')
                return
            }

            let data = {
                "username": username,
                "password": password
            }

            $.ajax({
                contentType: 'application/json;charset=UTF-8',
                url: 'http://localhost:8080/api/user/auth',
                type: 'POST',
                data: JSON.stringify(data),
                success: (resp) => {
                    if (resp.result === 'success') {
                        sessionStorage.setItem("logIn", JSON.stringify(resp.logIn))
                        location.href = '/board/showAll/1'
                    }
                },
                error: (resp) => {
                    console.log('error')
                    console(resp)
                }
            })


        })
        // 회원가입 버튼 누르면 /user/register로 이동.
        $('#btn-register').on('click', e => {
            location.href='/user/register'
        })
    }
)









