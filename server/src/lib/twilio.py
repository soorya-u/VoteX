import os
from twilio.rest import Client
from twilio.http.async_http_client import AsyncTwilioHttpClient

account_sid = os.getenv("TWILIO_ACCOUNT_SID") or ""
auth_token = os.getenv("TWILIO_AUTH_TOKEN") or ""
sender_phone_number = os.getenv("SENDER_PHONE_NUMBER")


async def send_message_via_twilio(number: str, otp: str):
    http_client = AsyncTwilioHttpClient()
    client = Client(account_sid, auth_token, http_client=http_client)
    await client.messages.create_async(
        to=f"+91{number}",
        from_=sender_phone_number,
        body=
        f"Your OTP for DemocraChain is {otp}.\nThis OTP is valid for 10 minutes.\nPlease keep your OTP confidential and do not share it with anyone for your account's security."
    )
