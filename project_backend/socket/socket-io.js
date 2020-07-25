const bookingDetails = require('..//model/bookingDetail');
module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("user Connected");


        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on("checkTotalSeats", () => {
            const seat = bookingDetails.aggregate([{
                $group: {
                    _id: '',
                    total: {
                        $sum: '$numberOfSeats',
                    }
                }
            }], (err, res) => {
                if (err) {

                    io.emit("error", err);
                } else {

                    io.emit("totalReservedSeats", res[0].total);
                }
            });
        });


        socket.on("bookingConfirm", (data) => {
            const seat = bookingDetails.aggregate([{
                $group: {
                    _id: '',
                    total: {
                        $sum: '$numberOfSeats'
                    }
                }
            }], (err, res) => {
                if (err) {
                    io.emit("error", err);
                } else {
                    total = res[0].total + data.numberOfSeats;
                    if (total > 80) {
                        io.emit("Cannot book", 80 - res[0].total);
                    }
                    else {
                        let user = new bookingDetails(data);
                        user.save((error, data1) => {
                            if (error) {
                                io.emit("error", err);
                            } else {
                                io.emit("totalReservedSeats", total);
                                io.emit("bookingSuccess");
                            }
                        });

                    }
                }
            });

        });
    });
}