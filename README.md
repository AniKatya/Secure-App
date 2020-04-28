# Secure-App #

![Image 1](https://github.com/AniKatya/personal-website/blob/master/src/resc1.png)


RescYouMe is a phone app created for you to feel safer wherever you go. Built using Google Maps API, Web-push npm package, MERN, Material UI, MobX.
It gives the user the ability to notify app users in his area to come to their aid, as well as play a fake ringtone, text his location, and call the police.

## Features: ##
![Image 2](https://github.com/AniKatya/personal-website/blob/master/src/resc2.png)
1. By clicking on the "Help" button on the Emergency tab, the user sends a SOS push notification to the app's other users (regardless if the users are logged into the app or not), who are geographically located within the vicinity of the user needing help.

    The text of the push notification states the user's name and location.
    The push notification is sent with 2 buttons:
    Decline - the push notification disappears off screen and 
    Accept - this user's phone automatically opens the app on his screen.
    The app will open to a new tab called "SOS", which will show:
    The exact address of the distressed user.
![Image 3](https://github.com/AniKatya/personal-website/blob/master/src/resc3.png)
2. By clicking on the "Call Police" button on the Emergency tab, the user's phone calls the police to notify that he is in trouble.

3. By clicking on the "Location" button on the Emergency tab, the user automatically sends a text message with his name and location prefilled in the text field to his emergency contacts.

4. By clicking on the "Ringtone" button on the Emergency tab, the user's phone plays a ringtone, giving the user the ability to pretend to answer a phonecall.

5. Add & Delete emergency contacts.
![Image 4](https://github.com/AniKatya/personal-website/blob/master/src/resc4.png)
