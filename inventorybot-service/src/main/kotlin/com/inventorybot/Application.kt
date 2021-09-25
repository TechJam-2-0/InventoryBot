package com.inventorybot

import io.micronaut.runtime.Micronaut.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory

fun main(args: Array<String>) {
	build()
	    .args(*args)
		.packages("com.inventorybot")
		.start()
}

@Suppress("UNUSED_PARAMETER")
inline fun <reified T> logger(from: T): Logger {
	return LoggerFactory.getLogger(T::class.java)
}

