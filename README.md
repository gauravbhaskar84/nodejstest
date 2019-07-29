# How to run this little Test Case

Go to the nodejs folder and change below values in values.yaml file:

1. hostname -- this will be the hostname or URL where this application will be accessed.
2. controller -- this will be the name of the ingress controller name, which will be used to route the traffic from outer world. I used `traefik` ingress controller for this test.
3. Also the tag in the values.yaml file, v2 for 0.1.0 and v3 for 0.1.1.
4. Change the version value in chart.yaml file, before creating a tar ball for the app.

    e.g. for first version we can use 0.1.0
         for second version of the app we can use 0.1.1

Image has been already published in public docker hub. So no need to makes changes, however, I have included a Dockerfile that I used for this basic test.

# How to create helm chart from the nodejs folder

After changing the values as recommended in values.yaml, below commands can be used to create a tar ball for the helm installation.

`helm package nodejs`

It will create a tar ball of name - nodejs-0.1.0.tgz when version value is 0.1.0 and image tag value is v2.

And - nodejs-0.1.1.tgz for version value 0.1.1 and image tag is v3.

So this way we will have two tar balls, which we can used to upragde from 1 to 2.

# Installing the app using helm

Run the below command to install this app:

`helm install nodejs-0.1.0.tgz --name nodejs-app`

Check the status for the app:

`helm status nodejs-0.1.0.tgz`

The app can be accssed with the url or hostname mentioned, e.g. if the hostname is given as `xyz.appledesign.co`, we can now accsessed this application. `appledesign.co` must be there in the DNS with wild card support.

We can also run the below command at the command line to see the output, the app we deployed will print the hostname of the Pod.

`while true; do curl https://xyz.appledesign.co; done`

O/P will be something like below:

`This is version 1 running in pod <pod's hostname>`

# Update the app using helm
Now after we generate a new package for nodejs app, we can simply update that with the below command:

`helm upgrade nodejs-app nodejs-0.1.1.tgz`

This will upgrade the app to te newest verison we can access the result in the similar manner,
`while true; do curl https://xyz.appledesign.co; done`.

O/P of now will grdually be like below:

`This is version 2 running in pod <pod's hostname>`

Note: nodejs-0.1.1.tgz package has the v3 image which had the little modification in app.js file- `version 1` to `version 2` in the output, just to display the rolling upgrade.

If somehow name of the App is not remembered then we can find out using `helm ls`.

# Check the history of the application:

This command can be used to check the history of the app:

`helm history nodejs-app`

# Rollbacking the application if needed.

If somehow we dont like the result of the latest version of the app, we can simply rollback the app using he below command:

`helm history nodejs-app`

Will display the deployed apps, we just need to pick the revision and run the below command:

`helm rollback nodejs-app 1`

It will roll back to the previous version of the app.
