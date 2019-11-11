var shift, getMyLocation, initAutoComplete, pushAddr2Box, toastMe, messenger, editAddress;
var shareIneedApp, setOrderIDGas, setOrderIDAcc, setPrice, requestDelivery;
// Dom7
var $$ = Dom7;


// Init App
var app = new Framework7({
  name : 'Ineed Gas Merchant',
  id: 'com.ineedapp.Ineed Gas Merchant',
  root: '#app',
  theme: 'auto',
  language: 'en',
  routes: routes
});

var mainView = app.views.create('.view-main', {
  url : './main.html',
  name : 'main',
  iosSwipeBack : false,
  router : true
});

toastMe = function(toastMessage){

    var toastMe = app.toast.create({
    text: toastMessage,
    position: 'center',
    closeTimeout: 3000,
  });

    toastMe.open();

}

editAddress = function(addressSerialNo, theAddressName, theAddressDetails){

    var editThisAddress = {

      addressSerialNo : addressSerialNo,
      theAddressName : theAddressName,
      theAddressDetails : theAddressDetails

    }
    editThisAddress = JSON.stringify(editThisAddress);
    window.localStorage.setItem("edit_this_address", editThisAddress);
    mainView.router.navigate("/editaddress/");
}



messenger = function(theMessage, theChannel, theEmail, thePhone, theSubject){

  app.request.post('https://nairasurvey.com/hub/messenger.php', 
            {
             "the_message" : theMessage,
             "the_channel" : theChannel,
             "the_email" : theEmail,
             "the_phone" : thePhone,
             "the_subject" : theSubject
           },
             function (data) {

                if (data == "Message Sent!") {

                  toastMe(data);
                  
                }
                else{

                    toastMe("Unable to send message. Try again later");
                    
                }

            }, function(){
                                 
                  toastMe("Network Error, Try again later");
                    
            });
}

setOrderIDGas = function(theOrderSN, theOrderID, theOrderBtn, cylinderSize, quantity, total, paymentMethod, orderDate, deliveryAddress, buyerName, buyerPhone, buyerEmail, orderStatus){
  $$("#" + theOrderBtn).html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
  var orderDetails = {

    theOrderSN : theOrderSN,
    theOrderID : theOrderID,
    cylinderSize : cylinderSize,
    quantity : quantity,
    total : total,
    paymentMethod : paymentMethod,
    orderDate : orderDate,
    deliveryAddress : deliveryAddress,
    buyerName : buyerName,
    buyerPhone : buyerPhone,
    buyerEmail : buyerEmail,
    orderStatus : orderStatus
  }

  window.localStorage.setItem("order_details", JSON.stringify(orderDetails));
  setTimeout(function(){
    mainView.router.navigate("/vieworder/");
  }, 2000);
  

}





setOrderIDAcc = function(theOrderSN, theOrderID, theOrderBtn, itemName, quantity, total, paymentMethod, orderDate, deliveryAddress, buyerName, buyerPhone, buyerEmail, orderStatus){
  $$("#" + theOrderBtn).html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
  var accOrderDetails = {

    theOrderSN : theOrderSN,
    theOrderID : theOrderID,
    itemName : itemName,
    quantity : quantity,
    total : total,
    paymentMethod : paymentMethod,
    orderDate : orderDate,
    deliveryAddress : deliveryAddress,
    buyerName : buyerName,
    buyerPhone : buyerPhone,
    buyerEmail : buyerEmail,
    orderStatus : orderStatus
  }

  window.localStorage.setItem("acc_order_details", JSON.stringify(accOrderDetails));
  setTimeout(function(){
    mainView.router.navigate("/viewaccorder/");
  }, 2000);
  

}


setPrice = function(suppliedID, theMessage){

    app.dialog.prompt(theMessage, function(myPrice){

      

        if (myPrice.trim() == "") {
          
          app.dialog.close();
          app.dialog.alert("Enter a valid price");

        }
        else{

          $$("#" + suppliedID).text(myPrice);

        }
    });

}


document.addEventListener("deviceready", deviceIsReady, false);



function deviceIsReady(){

StatusBar.backgroundColorByHexString("#ededed");

 

  document.addEventListener("backbutton", function (){
    
    var currentPage = mainView.router.currentRoute.name;
    
    //Re-route to Dashboard
    if(currentPage == "dashboard" || currentPage == "slides" || currentPage == "login" || currentPage == "signup"){

        navigator.app.exitApp();
    }

    else{

      mainView.router.back();

    }

}, false);



document.addEventListener("backbutton", function (){
    
    var currentPage = mainView.router.currentRoute.name;
    
    //Re-route to Dashboard
    if(currentPage == "settings" || currentPage == "dashboard" || currentPage == "slides" || currentPage == "login" || currentPage == "enterotp" || currentPage == "enterreccode" || currentPage == "recover"){

        navigator.app.exitApp();
    }

    // Pages to return to dashboard
    else if(currentPage == "newdelivery" || currentPage == "newaccdelivery"){

        mainView.router.navigate("/dashboard/");
    }

    else{

      mainView.router.back();

    }

}, false);



}















shift = function(shiftItem, theKeyCode){



      var split2Number = shiftItem.split("-");
      var theRealNumber = parseInt(split2Number[1]);
      var shift2Me = 0;

        
        
        var key = theKeyCode;

        if( key == 8 || key == 46 ){

          if(shiftItem != 'otp-1'){
            
            shift2Me = parseInt(theRealNumber - 1);
            $$("#otp-" + shift2Me).focus();
            
          }

        }else{
          
          if(shiftItem != 'otp-6'){
            
            shift2Me = parseInt(theRealNumber + 1);
            $$("#otp-" + shift2Me).focus();
            
          }
          

        }

    }









/* Greenie defined functions */
















$$(document).on('page:init', '.page[data-name="enterotp"]', function (e){

   $$("#resend-btn").hide();

    function runTimer(){

    var timer = 60;
    var countDown = window.setInterval(function(){
        timer = timer - 1;
        $$("#countdown-btn").text("00 : " + timer);
        if (timer == 0) { window.clearInterval(countDown); 
            $$("#countdown-btn").hide();
            $$("#resend-btn").show();
        }
        
    },1000);
  }

  runTimer();

      
    $$("#otp-1").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-1", key);
      },50);
      
      
    });


    $$("#otp-2").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-2", key);
      },50);
      
      
    });


    $$("#otp-3").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-3", key);
      },50);
      
      
    });


    $$("#otp-4").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-4", key);
      },50);
      
      
    });


    $$("#otp-5").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-5", key);
      },50);
      
      
    });


    $$("#otp-6").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-6", key);
      },50);
      
      
    });


    



    $$("#resend-btn").click(function(){

      $$("#countdown-btn").show();
      $$("#resend-btn").hide();
      runTimer();
      toastMe("Sending OTP...");
      messenger("Hello, your OTP for Ineed is " + JSON.parse(window.localStorage.getItem("seller_details")).email_otp + " <br>Regards, Ineed Team", "email", JSON.parse(window.localStorage.getItem("seller_details")).email, JSON.parse(window.localStorage.getItem("seller_details")).phone, "Ineed OTP Request");

    });



    
    



  $$("#finalise-reg-btn").click(function(){

    $$("#finalise-reg-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
    var buildUpOTP = $$("#otp-1").val() + $$("#otp-2").val() + $$("#otp-3").val() + $$("#otp-4").val() + $$("#otp-5").val() + $$("#otp-6").val();


      if (buildUpOTP == JSON.parse(window.localStorage.getItem("seller_details")).email_otp) {
        
        //OTP correct
        $$("#finalise-reg-btn").html("Continue").prop("disabled", false);
        setTimeout(function(){mainView.router.navigate("/setprices/");}, 2500);


          //Activate user account via email
          app.request.post('https://nairasurvey.com/hub/activate_account.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("seller_details")).seller_serial,
             "the_channel" : "email",

           },
             function (data) {

                if (data == "user activated") {


                  messenger("Hello, " + JSON.parse(window.localStorage.getItem("seller_details")).store_name + ", <br>You are welcome to Ineed. Explore for more features", "email", JSON.parse(window.localStorage.getItem("seller_details")).email, JSON.parse(window.localStorage.getItem("seller_details")).phone, "Welcome to Ineed!");



                }else{

                  toastMe("Unable to activate account. Try again Later");

                }

            }, function(){
                                 
                  toastMe("Network Error, Try again later");
                    
            });



      }
      else{

          toastMe("Invalid OTP");
          $$("#finalise-reg-btn").html("Continue").prop("disabled", false);
          $$(".otp-field").addClass("shake")
          setTimeout(function(){
            $$(".otp-field").removeClass("shake");
          },1000);
      }
      
  });


 
   
});











$$(document).on('page:init', '.page[data-name="dashboard"]', function (e){

    var driverSerialNo = JSON.parse(window.localStorage.getItem("driver_details")).driver_serial
     

      $$("#preview-driver-name").text(JSON.parse(window.localStorage.getItem("driver_details")).full_name);


      //count how many pending 
      app.request.post('https://nairasurvey.com/hub/logistics_drivers/count_orders.php', 
            {

             "logistics_driver" : driverSerialNo
             

           },
             function (data) {

                  
                  $$("#pending-orders-count").text(data);

             }, 
             function (data) {

                toastMe("Unable to fetch orders. Network error");

             });




    
     



      app.request.post('https://nairasurvey.com/hub/logistics_drivers/fetch_wallet_balance.php', 
            {

             "logistics_driver" : driverSerialNo
             

           },
             function (data) {

                  
                  $$("#wallet-balance-text").text(data);

             }, 
             function (data) {

                toastMe("Unable to fetch wallet balance. Network error");

             });

});
























$$(document).on('page:init', '.page[data-name="paypage"]', function (e){

      var checkboxWallet = $$('#checkbox-wallet');
      var checkboxCard = $$('#checkbox-card');

      checkboxWallet.prop("checked", true);

      checkboxCard.click(function(){
        checkboxWallet.prop("checked", false);
      });

      checkboxWallet.click(function(){
        checkboxCard.prop("checked", false);
      });


});





$$(document).on('page:init', '.page[data-name="wallet"]', function (e){

var driverSerialNo = JSON.parse(window.localStorage.getItem("driver_details")).driver_serial;
      

      app.request.post('https://nairasurvey.com/hub/logistics_drivers/fetch_wallet_balance.php', 
            {

             "logistics_driver" : driverSerialNo
             

           },
             function (data) {

                  
                  $$("#wallet-balance-span").text(data);

             }, 
             function (data) {

                toastMe("Unable to fetch wallet balance. Network error");

             });




       app.request.post('https://nairasurvey.com/hub/logistics_drivers/wallet_history.php', 
            {

             "driver_serial" : driverSerialNo            

           },
             function (data) {

                  
                  $$("#wallet-history-grid").html(data);

             }, 
             function (data) {

                toastMe("Unable to fetch wallet balance. Network error");

             });

});









$$(document).on('page:init', '.page[data-name="withdraw"]', function (e){
var driverSerialNo = JSON.parse(window.localStorage.getItem("driver_details")).driver_serial;



  var banks = ['Diamond Bank', 
  'Zenith Bank', 
  'United Bank Of Afica', 
  'Guarantee Trust Bank', 
  'Access Bank Plc', 
  'First Bank Nigeria', 
  'Ecobank', 'Fidelity Bank', 
  'First City Monument Bank', 
  'Heritage Bank', 
  'ASO Savings and Loans', 
  'Coronation Merchant Bank', 
  'FBN Mortgages Limited', 
  'Fortis Microfinance Bank', 
  'FSDH Merchant Bank', 
  'Imperial Homes Mortgage Bank', 
  'Jaiz Bank', 
  'Jubilee Life Mortgage Bank', 
  'Keystone Bank', 
  'New Prudential Bank', 
  'Nigeria International Bank(CITIGROUP)',
   'NPF Microfinance Bank', 
   'Omoluabi Savings and Loans Plc', 
   'Page MFBank', 'Parallex MFB', 
   'Safetrust Mortgage Bank', 
   'Polaris Bank', 
   'Stanbic IBTC Bank', 
   'Standard Chattered Bank', 
   'SunTrust Bank', 
   'Trustbond Mortgage Bank',
    'Union Bank of Nigeria', 
    'Unity Bank Plc', 
    'VFD Microfinance Bank Plc', 
    'Wema Bank Plc', 
    'Sterling Bank'];

    banks = banks.sort();
    for (var i = 0; i < banks.length; i++) {
    
      $$("#all-banks").append("<option value=" + banks[i] + ">" + banks[i] + "</option>");

    }  

     var smartSelect = app.smartSelect.create({ 
          el : ".smart-select",
          closeOnSelect : true,
          valueEl : ".selected-pot"
       });


    


    $$("#withdrawal-form").submit(function(){
      
     $$("#withdrawal-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
    
      app.request.post('https://nairasurvey.com/hub/logistics_drivers/request_withdrawal.php', 
            {

             
             "logistics_driver" : driverSerialNo,
             "bank_name" : $$(".selected-pot").text(),
             "account_number" : $$("#account-number").val(),
             "withdrawal_amount" : $$("#withdrawal-amount").val(),

             

           },
             function (data) {
                  
                if (data == "withdrawal successful") {

                    toastMe(data);
                    mainView.router.navigate("/settings/");

                  }
                  else{

                    toastMe(data);
                    $$("#withdrawal-btn").html("Done").prop("disabled", false);

                  }

             }, 
             function (data) {

                $$("#withdrawal-btn").html("Done").prop("disabled", false);
                toastMe("Unable to fetch wallet balance. Network error");

             });


        });

});











$$(document).on('page:init', '.page[data-name="recover"]', function (e){

    
    $$("#recover-btn").click(function(){

      if ($$("#user-email").val().trim() == "" || $$("#user-email").val().trim() == " ") {

            toastMe("Please enter a valid email");

      }
      else{

        $$("#recover-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>");
        
        app.request.post('https://nairasurvey.com/hub/logistics_drivers/recover_account.php', 
            {
             
             "user_email" : $$("#user-email").val()
           },
             function (data) {

              console.log(data);

              var splitData = data.split(" ");
              if (splitData[0] == "successful") {

                  window.localStorage.setItem("account_recovery_code", splitData[1]);
                  window.localStorage.setItem("recovery_request_user", splitData[2]);

                  toastMe("Recovery Code Sent!");
                  mainView.router.navigate("/enterreccode/");

              }else{

                  toastMe("Unable to recover account. Try again later");
                  $$("#recover-btn").html("Continue&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);
              }          

            }, function(){
              
                    
                    toastMe("Network Error, Try again later");
                    $$("#recover-btn").html("Continue&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

            });

      }





    });


});





$$(document).on('page:init', '.page[data-name="enterreccode"]', function (e){

  $$("#resend-btn").hide();

  function runTimer(){

    var timer = 60;
    var countDown = window.setInterval(function(){
        timer = timer - 1;
        $$("#countdown-btn").text("00 : " + timer);
        if (timer == 0) { window.clearInterval(countDown); 
            $$("#countdown-btn").hide();
            $$("#resend-btn").show();
        }
        
    },1000);
  }

  runTimer();




   $$("#otp-1").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-1", key);
      },50);
      
      
    });


    $$("#otp-2").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-2", key);
      },50);
      
      
    });


    $$("#otp-3").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-3", key);
      },50);
      
      
    });


    $$("#otp-4").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-4", key);
      },50);
      
      
    });


    $$("#otp-5").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-5", key);
      },50);
      
      
    });


    $$("#otp-6").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-6", key);
      },50);
      
      
    });




    $$("#resend-btn").click(function(){

      $$("#countdown-btn").show();
      $$("#resend-btn").hide();
      runTimer();
      toastMe("Sending OTP...");
      messenger("Hello, your OTP for Ineed is " + window.localStorage.getItem("account_recovery_code") + " <br>Regards, Ineed Team", "email", JSON.parse(window.localStorage.getItem("buyer_details")).email, JSON.parse(window.localStorage.getItem("buyer_details")).phone, "Account Recovery");

    });




  $$("#finalise-recovery").click(function(){

    $$("#finalise-recovery").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
    var buildUpOTP = $$("#otp-1").val() + $$("#otp-2").val() + $$("#otp-3").val() + $$("#otp-4").val() + $$("#otp-5").val() + $$("#otp-6").val();



      if (buildUpOTP == window.localStorage.getItem("account_recovery_code")) {
        
        //OTP correct
        setTimeout(function(){mainView.router.navigate("/setnewpassword/");}, 2500);


      }
      else{

          toastMe("Invalid OTP");
          $$("#finalise-recovery").html("Recover My Account").prop("disabled", false);
          $$(".otp-field").addClass("shake")
          setTimeout(function(){
            $$(".otp-field").removeClass("shake");
          },1000);
      }
      
  });


    

});





  

  $$(document).on('page:init', '.page[data-name="setnewpassword"]', function (e){

      
        $$("#complete-recovery-btn").click(function(){

          if ($$("#new-password").val().trim() == "" || $$("#new-password-confirm").val().trim() == "") {

              toastMe("Please enter valid passwords");

          }
          else if($$("#new-password").val() != $$("#new-password-confirm").val()){

            toastMe("Passwords do not match");
          }
          else{

              $$("#complete-recovery-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
              app.request.post('https://nairasurvey.com/hub/set_new_password.php', 
                {

                 "user_serial_no" : window.localStorage.getItem("recovery_request_user"),
                 "new_password" : $$("#new-password").val(),
                 "new_password_confirm" : $$("#new-password-confirm").val()

               },
               function (data) {

                  if (data == "Password Change Successful") {

                        toastMe(data);
                        setTimeout(function(){
                          mainView.router.navigate("/login/");
                        },2000);
                  }
                  else{

                    toastMe(data);
                    $$("#complete-recovery-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Complete Recovery").prop("disabled", false);

                  }


              }, function(){
                
                      
                      toastMe("Network Error, Try again later");
                      $$("#complete-recovery-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Complete Recovery").prop("disabled", false);

              });
            }

        });

  });








    $$(document).on('page:init', '.page[data-name="login"]', function (e){


          $$("#login-form").submit(function(e){

          $$("#login-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
            

            app.request.post('https://nairasurvey.com/hub/logistics_drivers/driver_login.php', 
            {
             "user_mail" : $$("#login-email").val(),
             "user_password" : $$("#login-password").val()
           },
             function (data) {

              console.log(data);

              if (data == "Invalid Login Details") {

                toastMe(data);
                $$("#login-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Login").prop("disabled", false);

              }
              else{

                      window.localStorage.setItem("driver_details", data);
                        setTimeout(function(){
                        mainView.router.navigate("/dashboard/");
                      },2000);

                
              }


            }, function(){
              
                    
                    toastMe("Network Error, Try again later");
                    $$("#login-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Login").prop("disabled", false);

            });

          });


    });














$$(document).on('page:init', '.page[data-name="settings"]', function (e){

  var driverSerialNo = JSON.parse(window.localStorage.getItem("driver_details")).driver_serial;
    $$("#preview-full-name").text(JSON.parse(window.localStorage.getItem("driver_details")).full_name);
    $$("#signout-btn").click(function(){

      app.dialog.progress("Signing Out...", "orange");
      setTimeout(function(){

          window.localStorage.removeItem("driver_details");
          app.dialog.close();
          mainView.router.navigate("/login/");

      }, 4000);


    });


    $$("#edit-store-details").click(function(){
        app.dialog.alert("Please visit the <b>Ineed</b> web portal to update your profile");
    });


    //get current store status
     app.request.post('https://nairasurvey.com/hub/logistics_drivers/switch.php', 
            {

             "logistics_driver" : driverSerialNo,
             "switch_status" : "online",
             "switch_type" : "fetch"

           },
             function (data) {

                  console.log(data);
                  if (data == "online") {

                    $$("#online-switch").prop("checked", true);
                  }
                  else{

                    $$("#online-switch").prop("checked", false);

                  }

             }, 
             function (data) {

                toastMe("Unable to switch. Network error");

             });


    $$("#online-switch").click(function(){

        if ($$("#online-switch").prop("checked") == true) {

            app.request.post('https://nairasurvey.com/hub/logistics_drivers/switch.php', 
            {

             "logistics_driver" : driverSerialNo,
             "switch_status" : "online",
             "switch_type" : "set"

           },
             function (data) {

                  toastMe("You are " + data + " for delivery orders");

             }, 
             function (data) {

                toastMe("Unable to switch. Network error");

             });


        }
        else{

            app.request.post('https://nairasurvey.com/hub/logistics_drivers/switch.php', 
            {

             "logistics_driver" : driverSerialNo,
             "switch_status" : "offline",
             "switch_type" : "set"

           },
             function (data) {

                  toastMe("You are " + data + " for delivery orders");

             }, 
             function (data) {

                toastMe("Unable to switch. Network error");

             });


        }

    });



    app.request.post('https://nairasurvey.com/hub/logistics_drivers/fetch_wallet_balance.php', 
        {

         "logistics_driver" : driverSerialNo

       },
         function (data) {

              
              $$("#wallet-balance-peek").text(data);

         }, 
         function (data) {

            toastMe("Unable to fetch wallet balance. Network error");

         });

});








$$(document).on('page:init', '.page[data-name="history"]', function (e){


      app.request.post('https://nairasurvey.com/hub/logistics_drivers/pull_orders.php', 
            {

             "logistics_driver" : JSON.parse(window.localStorage.getItem("driver_details")).driver_serial,
           
           },
             function (data) {

                  console.log(data);
                  $$("#history-container").html(data);
             }, 
             function (data) {

                toastMe("Unable to fetch Orders. Network error");

             });
});




























$$(document).on('page:init', '.page[data-name="verifyphone"]', function (e){

   $$("#resend-btn").hide();

    function runTimer(){

    var timer = 60;
    var countDown = window.setInterval(function(){
        timer = timer - 1;
        $$("#countdown-btn").text("00 : " + timer);
        if (timer == 0) { window.clearInterval(countDown); 
            $$("#countdown-btn").hide();
            $$("#resend-btn").show();
        }
        
    },1000);
  }

  runTimer();

      
    $$("#otp-1").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-1", key);
      },50);
      
      
    });


    $$("#otp-2").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-2", key);
      },50);
      
      
    });


    $$("#otp-3").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-3", key);
      },50);
      
      
    });


    $$("#otp-4").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-4", key);
      },50);
      
      
    });


    $$("#otp-5").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-5", key);
      },50);
      
      
    });


    $$("#otp-6").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-6", key);
      },50);
      
      
    });


    



    $$("#resend-btn").click(function(){

      $$("#countdown-btn").show();
      $$("#resend-btn").hide();
      runTimer();
      toastMe("Sending OTP...");
      messenger("Hello, your Phone OTP for Ineed App is " + JSON.parse(window.localStorage.getItem("buyer_details")).phone_otp, "phone", JSON.parse(window.localStorage.getItem("buyer_details")).email, JSON.parse(window.localStorage.getItem("buyer_details")).phone, "Ineed OTP Request");

    });



    
    



  $$("#finalise-reg-btn").click(function(){

    $$("#finalise-reg-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
    var buildUpOTP = $$("#otp-1").val() + $$("#otp-2").val() + $$("#otp-3").val() + $$("#otp-4").val() + $$("#otp-5").val() + $$("#otp-6").val();


      if (buildUpOTP == JSON.parse(window.localStorage.getItem("buyer_details")).phone_otp) {
        
        //OTP correct
        $$("#finalise-reg-btn").html("Continue").prop("disabled", false);
        
          //Activate user account via email
          app.request.post('https://nairasurvey.com/hub/activate_account.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "the_channel" : "phone",

           },
             function (data) {

                if (data == "user activated") {

                    mainView.router.navigate("/editprofile/");
                  

                }else{

                  toastMe("Unable to activate phone. Try again Later");

                }

            }, function(){
                                 
                  toastMe("Network Error, Try again later");
                    
            });



      }
      else{

          toastMe("Invalid OTP");
          $$("#finalise-reg-btn").html("Continue").prop("disabled", false);
          $$(".otp-field").addClass("shake")
          setTimeout(function(){
            $$(".otp-field").removeClass("shake");
          },1000);
      }
      
  });


 
   
});




$$(document).on('page:init', '.page[data-name="setotherprices"]', function (e){

  var theSeller = window.localStorage.getItem("seller_details");
  theSeller = JSON.parse(theSeller);

  var sellerSN = theSeller.seller_serial;

  

  $$("#confirm-other-prices-btn").click(function(){

    $$("#confirm-other-prices-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);

      app.request.post('https://nairasurvey.com/hub/set_seller_other_prices.php', 
            {

             "seller_sn" : sellerSN,
             "valves_price" : $$("#valves-price").text(),
             "cooker_repair_price" : $$("#cooker-repair-price").text(),
             "hose_price" : $$("#hose-price").text(),
             "regulator_price" : $$("#regulator-price").text()
             

           },
             function (data) {

                  if (data == "Prices Set") {

                    mainView.router.navigate("/dashboard/");
                  
                  }
                  else{

                    $$("#confirm-other-prices-btn").html("Continue&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

                  }
             }, 
             function (data) {

                toastMe("Unable to fetch addresses. Network error");
                $$("#confirm-other-prices-btn").html("Continue&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

             });


  });



});









$$(document).on('page:init', '.page[data-name="setprices"]', function (e){

  var theSeller = window.localStorage.getItem("seller_details");
  theSeller = JSON.parse(theSeller);
  
  var sellerSN = theSeller.seller_serial;

  

  $$("#confirm-prices-btn").click(function(){

    $$("#confirm-prices-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
      app.request.post('https://nairasurvey.com/hub/set_seller_prices.php', 
            {

             "seller_sn" : sellerSN,
             "three_kg_gas" : $$("#three-kg-gas").val(),
             "five_kg_gas" : $$("#five-kg-gas").val(),
             "six_kg_gas" : $$("#six-kg-gas").val(),
             "twelve_point_five_kg_gas" : $$("#twelve-point-five-kg-gas").val(),
             "fifty_kg_gas" : $$("#fifty-kg-gas").val()

             

           },
             function (data) {

                  if (data == "Prices Set") {

                      mainView.router.navigate("/setotherprices/");

                  }
                  else{

                    toastMe("Unable to set prices. Try again later");
                    $$("#confirm-prices-btn").html("Continue&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);
                  }
             }, 
             function (data) {

                toastMe("Unable to fetch addresses. Network error");
                $$("#confirm-prices-btn").html("Continue&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

             });


  });



});




















$$(document).on('page:init', '.page[data-name="newdelivery"]', function (e){

  var processingFee = 0;
  var deliveryFee = 0;

  var theOrderDetails = window.localStorage.getItem("order_details");
  theOrderDetails = JSON.parse(theOrderDetails);

  var theSeller = window.localStorage.getItem("seller_details");
  theSeller = JSON.parse(theSeller);

  $$("#buyer-delivery-address").val(theOrderDetails.deliveryAddress);
  $$("#buyer-name").val(theOrderDetails.buyerName);
  $$("#buyer-email").val(theOrderDetails.buyerEmail);
  $$("#buyer-phone").val(theOrderDetails.buyerPhone);


    $$("#new-delivery-btn").click(function(){

      $$(this).html("<img src='imgs/ripple.gif' style='max-width:50px; display:block; margin:0 auto;'>");

      

      app.request.post('https://nairasurvey.com/hub/init_logistics_transaction.php', 
            {

             
             "sender_address" : theSeller.store_address,
             "sender_name" : theSeller.store_name,
             "sender_email" : theSeller.email,
             "sender_phone" : theSeller.phone,
             "item_description" : $$("#item-description").val(),
             "package_size" : $$("#package-size").val(),
             "receiver_address" : theOrderDetails.deliveryAddress,
             "receiver_name" : theOrderDetails.buyerName,
             "receiver_email" : theOrderDetails.buyerEmail,
             "receiver_phone" : theOrderDetails.buyerPhone,
             "processing_fee" : processingFee,
             "total_price" : deliveryFee,
             "unique_id" : theOrderDetails.theOrderID
             
           },
             function (data) {

                if(data == "Order Added"){

                    toastMe(data);
                    mainView.router.navigate("/dashboard/");

                }
                else{

                    "Unable to complete order now";
                    console.log(data);
                    $$(this).text("Proceed");
                }
             },
             function (data) {

              console.log(data);

      });


    });







    app.request.post('https://nairasurvey.com/hub/fetch_fees.php', 
            {

             "the_seller" : JSON.parse(window.localStorage.getItem("seller_details")).seller_serial,
             "fee_name" : "base_fee"

           },
             function (data) {

                  //console.log(data);
                  $$("#processing-fee-span").text("NGN" + data);
                  processingFee = data;
             }, 
             function (data) {

                toastMe("Unable to fetch Orders. Network error");

             });


    app.request.post('https://nairasurvey.com/hub/fetch_fees.php', 
            {

             "the_seller" : JSON.parse(window.localStorage.getItem("seller_details")).seller_serial,
             "fee_name" : "per_kilometer_ fee"

           },
             function (data) {

                  //console.log(data);
                  var calculatedDistance = window.localStorage.getItem("delivery_distance");
                  deliveryFee = data * calculatedDistance;
                  
             }, 
             function (data) {

                toastMe("Unable to fetch Orders. Network error");

             });



});








$$(document).on('page:init', '.page[data-name="newaccdelivery"]', function (e){

  var processingFee = 0;
  var deliveryFee = 0;

  var theOrderDetails = window.localStorage.getItem("order_details");
  theOrderDetails = JSON.parse(theOrderDetails);

  var theSeller = window.localStorage.getItem("seller_details");
  theSeller = JSON.parse(theSeller);

  $$("#buyer-delivery-address").val(theOrderDetails.deliveryAddress);
  $$("#buyer-name").val(theOrderDetails.buyerName);
  $$("#buyer-email").val(theOrderDetails.buyerEmail);
  $$("#buyer-phone").val(theOrderDetails.buyerPhone);


    $$("#new-delivery-btn").click(function(){

      $$(this).html("<img src='imgs/ripple.gif' style='max-width:50px; display:block; margin:0 auto;'>");

      

      app.request.post('https://nairasurvey.com/hub/init_logistics_transaction.php', 
            {

             
             "sender_address" : theSeller.store_address,
             "sender_name" : theSeller.store_name,
             "sender_email" : theSeller.email,
             "sender_phone" : theSeller.phone,
             "item_description" : $$("#item-description").val(),
             "package_size" : $$("#package-size").val(),
             "receiver_address" : theOrderDetails.deliveryAddress,
             "receiver_name" : theOrderDetails.buyerName,
             "receiver_email" : theOrderDetails.buyerEmail,
             "receiver_phone" : theOrderDetails.buyerPhone,
             "processing_fee" : processingFee,
             "total_price" : deliveryFee,
             "unique_id" : theOrderDetails.theOrderID
             
           },
             function (data) {

                if(data == "Order Added"){

                    toastMe(data);
                    mainView.router.navigate("/dashboard/");

                }
                else{

                    "Unable to complete order now";
                    console.log(data);
                    $$(this).text("Proceed");
                }
             },
             function (data) {

              console.log(data);

      });


    });







    app.request.post('https://nairasurvey.com/hub/fetch_fees.php', 
            {

             "the_seller" : JSON.parse(window.localStorage.getItem("seller_details")).seller_serial,
             "fee_name" : "base_fee"

           },
             function (data) {

                  //console.log(data);
                  $$("#processing-fee-span").text("NGN" + data);
                  processingFee = data;
             }, 
             function (data) {

                toastMe("Unable to fetch Orders. Network error");

             });


    app.request.post('https://nairasurvey.com/hub/fetch_fees.php', 
            {

             "the_seller" : JSON.parse(window.localStorage.getItem("seller_details")).seller_serial,
             "fee_name" : "per_kilometer_ fee"

           },
             function (data) {

                  //console.log(data);
                  var calculatedDistance = window.localStorage.getItem("delivery_distance");
                  deliveryFee = data * calculatedDistance;
                  
             }, 
             function (data) {

                toastMe("Unable to fetch Orders. Network error");

             });



});





$$(document).on('page:init', '.page[data-name="vieworder"]', function (e){



  var theSeller = window.localStorage.getItem("seller_details");
  theSeller = JSON.parse(theSeller);
  
  var sellerSN = theSeller.seller_serial;

  var theOrderDetails = window.localStorage.getItem("order_details");
  theOrderDetails = JSON.parse(theOrderDetails);


  $$("#buyer-name-span").html(theOrderDetails.buyerName);
  $$("#cylinder-size-span").html(theOrderDetails.cylinderSize);
  $$("#cylinder-qty-span").html(theOrderDetails.quantity);
  $$("#total-amt-span").html("NGN" + theOrderDetails.total);
  $$("#request-date-span").html(theOrderDetails.orderDate);
  $$("#order-id-span").html(theOrderDetails.theOrderID);
  $$("#delivery-address-span").html(theOrderDetails.deliveryAddress);

  $$("#buyer-phone-chip").prop("href", "tel:" + theOrderDetails.buyerPhone);

  var sellerAddress = theSeller.store_address;

  setTimeout(function(){
    initMap();
  }, 1500);
  

    //check order status
    if (theOrderDetails.orderStatus == "processing") {

        //first check if seller has ordered for logistics services, if yes, attach the call biker button

        $$("#accept-reject-row").html("You accepted this order. Ensure order is delivered to customer.").addClass("text-center");

    }

    if (theOrderDetails.orderStatus == "completed") {

        $$("#accept-reject-row").html("Order has been completed. Thank you.").addClass("text-center");

    }




     requestDelivery = function(){

        mainView.router.navigate("/newdelivery/");
        

    }

  


  

  $$("#accept-order-btn").click(function(){

    //initiate distance matrix and directions api
    toastMe("Calculating Distance and Estimated Time..");

    $$("#accept-reject-row").html("<img src='imgs/ripple.gif' style='max-width:50px; display:block; margin:0 auto;'>");
   

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [sellerAddress],
        destinations: [theOrderDetails.deliveryAddress],
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: true,
      }, callback);

    var theDistance, theDuration;

    function callback(response, status) {
      if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            theDistance = element.distance.text;
            theDuration = element.duration.text;
            var from = origins[i];
            var to = destinations[j];
            var splitDistance = theDistance.split(" ");
            theRealDistance = splitDistance[0];
            
            window.localStorage.setItem("delivery_distance", theRealDistance);

            $$("#accept-reject-row").html("<span>Distance: <b>" + theDistance + "</b></span><br><span>Estimated Delivery Time: <b>" + theDuration + "</b></span><br><br><button class='col button button-large button-raised button-fill color-teal bg-color-primary' onclick='requestDelivery();'><i class='icon material-icons'>motorcycle</i>&nbsp;Request Ineed Delivery Services</button>").css('font-size', '14px');
          }
        }
      }

      else{

        app.dialog.alert(status);

      }
    }

    




      
       app.request.post('https://nairasurvey.com/hub/seller_accept_order.php', 
            {

             "order_sn" : theOrderDetails.theOrderSN,
             "order_table" : "gas_orders"
             
           },
             function (data) {

                console.log(data);

             },
             function (data) {

              console.log(data);

            });
  });

  



  $$("#decline-order-btn").click(function(){

    app.dialog.prompt("Reason for Decline?", function(getPrompt){

          if (getPrompt.trim() == "") {

              app.dialog.alert("Please enter a valid reason");
          }
          else{

          app.request.post('https://nairasurvey.com/hub/seller_decline_order.php', 
            {

             "order_sn" : theOrderDetails.theOrderSN,
             "decline_reason" : getPrompt,
             "buyer_email" : theOrderDetails.buyerEmail,
             "order_table" : "gas_orders",
             "total_amount" : theOrderDetails.total

             
           },
             function (data) {

                if (data == "Decline Success") {

                    mainView.router.navigate("/history/");
                }

             },
             function (data) {

              console.log(data);

            });

          }

    });
      
       
  });






          var directionsService = new google.maps.DirectionsService();
          var directionsDisplay = new google.maps.DirectionsRenderer();
          var marker;
         

          function initMap() {

              

                var lagos = new google.maps.LatLng(6.5244, 3.3792);
                var mapOptions = {
                  zoom:15,
                  center: lagos,
                  mapTypeControl : false,
                  fullscreenControl: false
                }
                var map = new google.maps.Map(document.getElementById('my-map'), mapOptions);
                directionsDisplay.setMap(map);

                var startFormattedAddress;
                var geocoder = new google.maps.Geocoder().geocode({'address': sellerAddress}, function(results, status) {

                   startFormattedAddress =  results[0].geometry.location;
                   var startIcon = {
                    url : "imgs/delivery_bike.png",
                    scaledSize: new google.maps.Size(50, 50)
                   }

                   var infowindow = new google.maps.InfoWindow({
                      content: "Pickup Address"
                    });

                   marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position:  new google.maps.LatLng(startFormattedAddress.lat(), startFormattedAddress.lng()),
                    icon : startIcon
                  });

                   infowindow.open(map, marker);
                   


                 });



                  var endFormattedAddress;
                  var geocoder = new google.maps.Geocoder().geocode({'address': theOrderDetails.deliveryAddress}, function(results, status) {

                     endFormattedAddress =  results[0].geometry.location;
                     var endIcon = {
                      url : "imgs/delivery_address.png",
                      scaledSize: new google.maps.Size(50, 50)
                     }

                     var infowindow = new google.maps.InfoWindow({
                      content: "Delivery Address"
                    });

                     marker = new google.maps.Marker({
                      map: map,
                      animation: google.maps.Animation.DROP,
                      position:  new google.maps.LatLng(endFormattedAddress.lat(), endFormattedAddress.lng()),
                      icon : endIcon
                    });

                     infowindow.open(map, marker);
                     marker.addListener('click', function() {
                        infowindow.open(map, marker);
                      });

                   });
                  
            
            
                calcRoute();
          }

          function calcRoute() {

            var start = sellerAddress;
            var end = theOrderDetails.deliveryAddress;
            var request = {
              origin: start,
              destination: end,
              travelMode: 'DRIVING'
            };

            directionsService.route(request, function(result, status) {
              if (status == 'OK') {

                directionsDisplay.setDirections(result);
                directionsDisplay.setOptions( { suppressMarkers: true } );
                toastMe("Zoom in on map to view directions...");
              }
              else{

                 toastMe(status);

              }
            });
          }

          


    





    

    

});









$$(document).on('page:init', '.page[data-name="viewaccorder"]', function (e){



  var theSeller = window.localStorage.getItem("seller_details");
  theSeller = JSON.parse(theSeller);
  
  var sellerSN = theSeller.seller_serial;

  var theOrderDetails = window.localStorage.getItem("acc_order_details");
  theOrderDetails = JSON.parse(theOrderDetails);




  $$("#buyer-name-span").html(theOrderDetails.buyerName);
  $$("#item-name-span").html(theOrderDetails.itemName);
  $$("#item-qty-span").html(theOrderDetails.quantity);
  $$("#total-amt-span").html("NGN" + theOrderDetails.total);
  $$("#request-date-span").html(theOrderDetails.orderDate);
  $$("#order-id-span").html(theOrderDetails.theOrderID);
  $$("#delivery-address-span").html(theOrderDetails.deliveryAddress);

  $$("#buyer-phone-chip").prop("href", "tel:" + theOrderDetails.buyerPhone);

  var sellerAddress = theSeller.store_address;
  
  setTimeout(function(){
    initMap();
  }, 1500);


   if (theOrderDetails.orderStatus == "processing") {

        $$("#acc-accept-reject-row").html("You accepted this order. Ensure order is delivered to customer.").addClass("text-center");

    }

    if (theOrderDetails.orderStatus == "completed") {

        $$("#acc-accept-reject-row").html("Order has been completed. Thank you.").addClass("text-center");

    }



      requestDelivery = function(){

        mainView.router.navigate("/newaccdelivery/");
        
      }



  

  $$("#accept-order-btn").click(function(){



    //initiate distance matrix and directions api
    toastMe("Calculating Distance and Estimated Time..");

    
   

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [sellerAddress],
        destinations: [theOrderDetails.deliveryAddress],
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: true,
      }, callback);

    var theDistance, theDuration;

    function callback(response, status) {
      if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            theDistance = element.distance.text;
            theDuration = element.duration.text;
            var from = origins[i];
            var to = destinations[j];
            var splitDistance = theDistance.split(" ");
            theRealDistance = splitDistance[0];
            
            window.localStorage.setItem("delivery_distance", theRealDistance);

            $$("#acc-accept-reject-row").html("<span>Distance: <b>" + theDistance + "</b></span><br><span>Estimated Delivery Time: <b>" + theDuration + "</b></span><br><br><button class='col button button-large button-raised button-fill color-teal bg-color-primary' onclick='requestDelivery()'><i class='icon material-icons'>motorcycle</i>&nbsp;Request Ineed Rider</button>").css('font-size', '14px');
          }
        }
      }

      else{

        toastMe(status);

      }
    }

    




      
       app.request.post('https://nairasurvey.com/hub/seller_accept_order.php', 
            {

             "order_sn" : theOrderDetails.theOrderSN,
             "order_table" : "gas_accessories_orders"
             
           },
             function (data) {

                console.log("Order Has been accepted");
                
                

             },
             function (data) {

              console.log(data);

            });
  });

  



  $$("#decline-order-btn").click(function(){

    app.dialog.prompt("Reason for Decline?", function(getPrompt){

          if (getPrompt.trim() == "") {

              app.dialog.alert("Please enter a valid reason");
          }
          else{

          app.request.post('https://nairasurvey.com/hub/seller_decline_order.php', 
            {

             "order_sn" : theOrderDetails.theOrderSN,
             "decline_reason" : getPrompt,
             "buyer_email" : theOrderDetails.buyerEmail,
             "order_table" : "gas_orders",
             "total_amount" : theOrderDetails.total

             
           },
             function (data) {

                if (data == "Decline Success") {

                    mainView.router.navigate("/history/");


                }

             },
             function (data) {

              console.log(data);

            });

          }

    });
      
       
  });






          var directionsService = new google.maps.DirectionsService();
          var directionsDisplay = new google.maps.DirectionsRenderer();
          var marker;
         

          function initMap() {

              

                var lagos = new google.maps.LatLng(6.5244, 3.3792);
                var mapOptions = {
                  zoom:15,
                  center: lagos,
                  mapTypeControl : false,
                  fullscreenControl: false
                }
                var map = new google.maps.Map(document.getElementById('my-map'), mapOptions);
                directionsDisplay.setMap(map);

                var startFormattedAddress;
                var geocoder = new google.maps.Geocoder().geocode({'address': sellerAddress}, function(results, status) {

                   startFormattedAddress =  results[0].geometry.location;
                   var startIcon = {
                    url : "imgs/delivery_bike.png",
                    scaledSize: new google.maps.Size(50, 50)
                   }

                   var infowindow = new google.maps.InfoWindow({
                      content: "Pickup Address"
                    });

                   marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position:  new google.maps.LatLng(startFormattedAddress.lat(), startFormattedAddress.lng()),
                    icon : startIcon
                  });

                  infowindow.open(map, marker);
                  


                 });



                  var endFormattedAddress;
                  var geocoder = new google.maps.Geocoder().geocode({'address': theOrderDetails.deliveryAddress}, function(results, status) {

                     endFormattedAddress =  results[0].geometry.location;
                     var endIcon = {
                      url : "imgs/delivery_address.png",
                      scaledSize: new google.maps.Size(50, 50)
                     }

                     var infowindow = new google.maps.InfoWindow({
                      content: "Delivery Address"
                     });

                     marker = new google.maps.Marker({
                      map: map,
                      animation: google.maps.Animation.DROP,
                      position:  new google.maps.LatLng(endFormattedAddress.lat(), endFormattedAddress.lng()),
                      icon : endIcon
                    });

                     infowindow.open(map, marker);
                     


                   });
                  
            
            
                calcRoute();
          }

          function calcRoute() {

            var start = sellerAddress;
            var end = theOrderDetails.deliveryAddress;
            var request = {
              origin: start,
              destination: end,
              travelMode: 'DRIVING'
            };

            directionsService.route(request, function(result, status) {
              if (status == 'OK') {

                directionsDisplay.setDirections(result);
                directionsDisplay.setOptions( { suppressMarkers: true } );
                toastMe("Zoom in on map to view directions...");
              }
              else{

                  alert(status);

              }
            });
          }

          


    





    

    

});



