package com.apsel.mipppdeli.api

import com.apsel.mipppdeli.routes.UsersRoutes

class ApiRoutes {


    val API_URL = "http://192.168.56.1:3000/api/"
    val retrofit = RetrofitClient()

    fun getUsersRoutes(): UsersRoutes {
        return retrofit.getClient(API_URL).create(UsersRoutes::class.java)

    }
}