plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "ar.casa.launcher"
    compileSdk = 34

    defaultConfig {
        applicationId = "ar.casa.launcher"
        minSdk = 26
        targetSdk = 34
        versionCode = 12
        versionName = "1.2"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}
