class HTTP {
    constructor(baseUrl) {
        if (baseUrl !== undefined) {
            this.baseUrl = baseUrl;
        } else {
            this.baseUrl = sessionStorage.getItem("http");
        }
    }

    async request({ metodo = "GET", path = null, body = null, token = true }) {
        if (path === undefined) {
            return "path vazio";
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (token) {
            if (this.token) {
                myHeaders.append("Authorization", "Bearer " + this.token);
            } else {
                return
            }
        }
        let url = this.baseUrl + path;
        let settings = {
            method: metodo,
            headers: myHeaders,
            crossDomain: true,
        };

        if (body) {
            settings.body = JSON.stringify(body);
            settings.crossDomain = true;
        }
        try {
            let response = fetch(url, settings)
                .then(res => res)
                .catch((error) => { });
            return response;
        } catch (error) {
            console.log("error");
        }
    }

    async get(path, body= null) {
        try {
            let data = await this.request({
                path: path,
            });
            return data.json();
        } catch (error) {
            return error;
        }
    }

    async post(path, body = null) {
        try {
            let data = await this.request({
                metodo: "POST",
                path: path,
                body: body,
            });
            return data.json();
        } catch (error) {
            return error;
        }
    }

    async put(path, body = null) {
        try {
            let data = await this.request({
                metodo: "PUT",
                path: path,
                body: body,
            });
            return data.json();
        } catch (error) {
            return error;
        }
    }

    async login(values) {
        try {
            let data = await this.request({
                metodo: "POST",
                token: false,
                path: "app/token",
                body: {
                    username: values.user,
                    password: values.password,
                },
            });
            if (data.status == 200) {
                return data.json();
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    }

    httpUpdate({ token }) {
        this.token = token
    }
}

const host = window.location.host.split(":")[0];
export default HTTP = new HTTP(`http://${host}:6002/`);
