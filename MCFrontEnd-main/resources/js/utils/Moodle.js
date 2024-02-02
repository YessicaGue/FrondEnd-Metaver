import Swal from "sweetalert2";

export const LoginMoodle = (
    name,
    username,
    email
) => {
    let baseUrl = window.location.origin;
    // let baseUrl = 'https://dashboard.ciudadanosenmovimiento.org';
    let urlTmp = `${baseUrl}/moodle/loginicmc.php?name=` + name
        + "&lastname=" + name
        + "&usrname=" + email
        + "&email=" + email + "";

    axios.get(urlTmp)
        .then(response => {
            console.log(response);
            window.open(response.data, '_blank');
        })
        .catch(async error => {
            console.log(error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal al ingresar a Moodle, intenta de nuevo!',
            });
        });
}
