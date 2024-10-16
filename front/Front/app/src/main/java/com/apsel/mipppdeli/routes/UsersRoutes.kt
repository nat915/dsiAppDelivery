package com.apsel.mipppdeli.routes

import android.provider.ContactsContract.CommonDataKinds.Email
import com.apsel.mipppdeli.models.ResponseHttp
import com.apsel.mipppdeli.models.User
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface UsersRoutes {

    @POST("users/create")
    fun register(@Body user: User): Call<ResponseHttp>

    @FormUrlEncoded
    @POST("users/login")
    fun login(@Field("email")email: String, @Field("password") password: String): Call<ResponseHttp>
}