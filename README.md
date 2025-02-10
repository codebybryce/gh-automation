```
docs/linux_server_automation.md
Running Multiple Node.js Scripts at Different Intervals Using Systemd Timers
This guide will help you run multiple Node.js scripts at specific intervals using systemd timers on a Linux VM.

Step 1: Create a Systemd Service for Each Script
Each script needs its own service file.

Create Service File for update-regex.js
Open a new service file:
sudo nano /etc/systemd/system/update-regex.service
Add the following content:
[Unit]
Description=Run update-regex.js

[Service]
ExecStart=/usr/bin/node /path/to/update-regex.js
User=youruser
Group=yourgroup
StandardOutput=append:/var/log/update-regex.log
StandardError=append:/var/log/update-regex.log
Save and exit (Ctrl + X, then Y, then Enter).
Create Service File for script2.js
Open a new service file:
sudo nano /etc/systemd/system/script2.service
Add:
[Unit]
Description=Run script2.js

[Service]
ExecStart=/usr/bin/node /path/to/script2.js
User=youruser
Group=yourgroup
StandardOutput=append:/var/log/script2.log
StandardError=append:/var/log/script2.log
Save and exit.
Step 2: Create Systemd Timer Files
Each script needs a corresponding timer file to define its execution interval.

Create Timer for update-regex.js (Runs Every 5 Minutes)
Open a new timer file:
sudo nano /etc/systemd/system/update-regex.timer
Add the following content:
[Unit]
Description=Run update-regex.js every 5 minutes

[Timer]
OnBootSec=1min
OnUnitActiveSec=5min
Unit=update-regex.service

[Install]
WantedBy=timers.target
Save and exit.
Create Timer for script2.js (Runs Every Hour)
Open a new timer file:
sudo nano /etc/systemd/system/script2.timer
Add:
[Unit]
Description=Run script2.js every hour

[Timer]
OnBootSec=1min
OnUnitActiveSec=1h
Unit=script2.service

[Install]
WantedBy=timers.target
Save and exit.
Step 3: Enable and Start the Timers
Run the following commands to apply the new services and timers:


sudo systemctl daemon-reload
sudo systemctl enable update-regex.timer
sudo systemctl start update-regex.timer

Step 4: Verify the Timers
Check the status of all timers:


systemctl list-timers --all

Check logs for update-regex.js:


journalctl -u update-regex.service --follow

Check logs for script2.js:


journalctl -u script2.service --follow

Step 5: Manage the Services and Timers
Stop a Timer

sudo systemctl stop update-regex.timer

Restart a Timer

sudo systemctl restart update-regex.timer

Disable a Timer (Prevent Auto-Start)

sudo systemctl disable update-regex.timer

Conclusion
Using systemd timers ensures that your Node.js scripts run at specific intervals reliably. They provide better logging, error handling, and restart capabilities compared to cron.

```

Edit service file
```bash
sudo nano /etc/systemd/system/update-regex.service
```
Read Logs
```bash
sudo nano /var/log/update-regex.log
```

Disable Autostart
```bash
sudo systemctl disable update-regex.timer
```

Start
```bash
sudo systemctl start update-regex.timer
```
Stop
```bash
sudo systemctl stop update-regex.timer
```
Restart
```bash
sudo systemctl restart update-regex.timer
```