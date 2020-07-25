import { Injectable } from '@angular/core';
import io from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket;
  public reservedSeats;
  public availableSeats;
  constructor() {

    this.socket = io("https://railway-ticket-reservation.herokuapp.com");
    this.socket.on('connect', function () {
      console.log('connected to server');
    });



    this.socket.on('disconnect', function () {
      console.log('disconnected to server');
    });


    this.socket.on("error", mssg => {
      alert("error message" + mssg);
    }
    );
    this.socket.on("Cannot book", data => {
      if (data == 0) {
        alert("All seats are reserved.");
      } else {
        alert("SORRY!!! You can book upto " + data + " seats.");
      }
    });


  }


}
