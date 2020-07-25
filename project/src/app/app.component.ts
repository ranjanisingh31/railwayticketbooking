import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public toggle = false;
  public availableSeats: number = 0;
  public reservedSeats: number = 0;


  public alreadyRegistered: number = 0;
  public bookedSeats: number = 0;


  constructor(private fb: FormBuilder, private socketService: SocketService) {
  }

  public seatBookingForm = this.fb.group({
    numberOfSeats: ['', [Validators.required, Validators.pattern("[1,2,3,4,5,6,7]")]]
  });



  onSubmit() {

    this.socketService.socket.emit("bookingConfirm", (this.seatBookingForm.value));
    this.socketService.socket.on("bookingSuccess", () => {
      alert("Booking Confirmed!!! ");
      this.toggle = true;
      console.log("seats", this.availableSeats, this.reservedSeats);
      this.bookedSeats = this.seatBookingForm.value.numberOfSeats;
      this.alreadyRegistered = this.reservedSeats - this.bookedSeats;
      console.log("ar", this.alreadyRegistered, this.bookedSeats);
    });

  }

  ngOnInit(): void {
    this.socketService.socket.emit("checkTotalSeats");

    //Updates the reserved and avalilable seats 
    this.socketService.socket.on("totalReservedSeats", (data) => {
      this.reservedSeats = data;
      this.availableSeats = 80 - data;
      console.log(this.availableSeats, this.reservedSeats);

    });

  }
}
