package com.apsel.mipppdeli.providers

import android.provider.ContactsContract.CommonDataKinds.Email
import com.apsel.mipppdeli.api.ApiRoutes
import com.apsel.mipppdeli.models.ResponseHttp
import com.apsel.mipppdeli.models.User
import com.apsel.mipppdeli.routes.UsersRoutes
import retrofit2.Call

class UsersProvider {

    private var usersRoutes: UsersRoutes? = null

    init {
        val api = ApiRoutes()
        usersRoutes = api.getUsersRoutes()
    }

    fun register(user: User): Call<ResponseHttp>? {
        return usersRoutes?.register(user)
    }

    fun login(email: String, password: String): Call<ResponseHttp>? {
        return usersRoutes?.login(email, password)
    }

}