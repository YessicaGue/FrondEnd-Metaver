<?php
// Allow from any origin
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
    // whitelist of safe domains
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}
/**
 * @param   string $useremail Email address of user to create token for.
 * @param   string $firstname First name of user (used to update/create user).
 * @param   string $lastname Last name of user (used to update/create user).
 * @param   string $username Username of user (used to update/create user).
 * @param   string $ipaddress IP address of end user that login request will come from (probably $_SERVER['REMOTE_ADDR']).
 * @param int      $courseid Course id to send logged in users to, defaults to site home.
 * @param int      $modname Name of course module to send users to, defaults to none.
 * @param int      $activityid cmid to send logged in users to, defaults to site home.
 * @return bool|string
 */
function getloginurl($useremail, $firstname, $lastname, $username, $courseid = null, $modname = null, $activityid = null) {
    require_once('curl.php');
        
    $token        = '367372b00ad5a67f7fcfef5a2c923481';
    $domainname   = 'https://capacitacion.ciudadanosenmovimiento.org';
    $functionname = 'auth_userkey_request_login_url';

    $param = [
        'user' => [
            'firstname' => $firstname, // You will not need this parameter, if you are not creating/updating users
            'lastname'  => $lastname, // You will not need this parameter, if you are not creating/updating users
            'username'  => $username, 
            'email'     => $useremail,
        ]
    ];

    $serverurl = $domainname . '/webservice/rest/server.php' . '?wstoken=' . $token . '&wsfunction=' . $functionname . '&moodlewsrestformat=json';
    $curl = new curl; // The required library curl can be obtained from https://github.com/moodlehq/sample-ws-clients 

    try {
        $resp     = $curl->post($serverurl, $param);
        $resp     = json_decode($resp);
//print_r($resp);        
        if ($resp && !empty($resp->loginurl)) {
            $loginurl = $resp->loginurl;        
        }
    } catch (Exception $ex) {
        return false;
    }

    if (!isset($loginurl)) {
        return false;
    }

    $path = '';
    if (isset($courseid)) {
        $path = '&wantsurl=' . urlencode("$domainname/course/view.php?id=$courseid");
    }
    if (isset($modname) && isset($activityid)) {
        $path = '&wantsurl=' . urlencode("$domainname/mod/$modname/view.php?id=$activityid");
    }

    return $loginurl . $path;
}

if(isset($_GET)){
    $name = $_GET['name'];
    $lastName = $_GET['lastname'];
    $usrname = $_GET['usrname'];
    $email = $_GET['email'];
    
    //echo 'si estoy aqui';
    echo getloginurl($email, $name, $lastName,  $usrname);    
}
