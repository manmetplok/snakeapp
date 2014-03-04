/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var HOST = 'http://bak'
var app = {
    socket: null,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onResume: function () {
        app.start();
    },

    onPause: function () {
        app.socket.disconnect();
        app.socket = null;
    },

    start: function () {

        console.log("Connecting!!!!");
        app.socket = io.connect(HOST, {'port': 5000, 'force new connection': true});
        app.socket.emit('start', {'name':'henk', 'color':'#ff0000'}) ;
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.addEventListener("resume", app.onResume, false);
        document.addEventListener("pause", app.onPause, false);
        app.start();
    },
};

function up() {
    app.socket.emit('direction','up' );
}

function down() {
    app.socket.emit('direction', 'down');
}

function right() {
    app.socket.emit('direction', 'right');
}

function left() {
    app.socket.emit('direction', 'left');
}
