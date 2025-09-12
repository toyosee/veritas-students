import platform
from flask import json
import psutil
import socket
from datetime import datetime


# Function to get system info
def get_system_info():
    info = {}

    # System basics
    info["OS"] = platform.system()
    info["OS Version"] = platform.version()
    info["Architecture"] = platform.machine()
    info["Processor"] = platform.processor()
    info["Hostname"] = socket.gethostname()

    # IP Address
    try:
        info["IP Address"] = socket.gethostbyname(socket.gethostname())
    except Exception:
        info["IP Address"] = "Unavailable"

    # Battery info
    battery = psutil.sensors_battery()
    if battery:
        info["Battery Percent"] = f"{battery.percent}%"
        info["Charging"] = battery.power_plugged
    else:
        info["Battery"] = "No battery info available"

    # Memory usage
    mem = psutil.virtual_memory()
    info["Total RAM"] = f"{mem.total // (1024 ** 2)} MB"
    info["Available RAM"] = f"{mem.available // (1024 ** 2)} MB"

    # CPU usage
    info["CPU Usage"] = f"{psutil.cpu_percent(interval=1)}%"

    # System time
    info["System Time"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return info


# Newer way of writing condition using ternary
# Greeting based on time of day
def greet_based_on_time():
    hour = datetime.now().hour
    return (
        'Good Morning!' if 5 <= hour < 12 else
        'Good Afternoon!' if 12 <= hour < 18 else
        'Good Evening!'
    )

# Function to load customers json data from json file
def load_customers():
    with open('customers.json') as customers_data:
        data = json.load(customers_data)
    return data

# Function to explicitly return System time
def system_time():
    sys_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return sys_time

