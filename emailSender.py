# Send an email from hello@lucent.studio with resend.com
import os
import resend
from dotenv import load_dotenv
import csv
import asyncio
load_dotenv()



import openai
import json
import aiohttp

openai.api_key = os.getenv("MY_OPENAI_KEY")


async def askLLM(prompt: str, isJson: bool = False) -> str:
    if isJson:
        prompt = prompt + "\nYour output should not include anything except the json valid object/list. You should not start or end with ``` or json or anything other than { or }"
    
    print("Asking AI:", prompt)
    # input("Click enter to confirm")
    
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {openai.api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-4.1-2025-04-14",
                "messages": [{"role": "system", "content": prompt}],
                "temperature": 0.2
            }
        ) as response:
            result = await response.json()
            
    try:
        extractedResponse = result['choices'][0]['message']['content'].strip()
        print(f"Successfully processed AI response: {extractedResponse}")
        
        if not isJson:
            return extractedResponse
        else:
            try:
                # If the response has ```json at the start take that off the start and ``` off the end
                if (extractedResponse.startswith("```json") or extractedResponse.startswith("``` json")) and extractedResponse.endswith("```"):
                    extractedResponse = extractedResponse[7:-3]
                return json.loads(extractedResponse)
            except:
                print("Failed to parse into json", result)
                return {"result": extractedResponse}
    except:
        print(f"Failed to parse AI response:", result)
        return None


resend.api_key = os.environ.get("RESEND_API_KEY")

def sendEmail(to, subject, html):
    params = {
        "from": "Will OBrien<hello@lucent.studio>",
        "to": to,
        "subject": subject,
        "html": html,
    }

    r = resend.Emails.send(params)
    return r

async def generateEmail(name, description, website, address, additionalNotes):
    emailDict = await askLLM(f"""
You are an expert copywrighter and cold emailer.
I have a website design and development agency called lucent studio (https://lucent.studio)
I'm the developer and my girlfriend Abbey is the designer.
We recently designed embody osteopathy's website (https://www.embodyhealthcare.com.au/) which is an osteo in Eltham (On Bolton Street) and are quite prouf of the design and website in general
Here's the review from Kath the owner of the osteo:
"We were extremely happy with the high level of professional and attentive service that Will and Abbey provided. There was excellent communication and a quick turnaround of changes we wanted to make. Will and Abbey were wonderful to deal with, having an excellent insight into the professional design and layout of our website. We are delighted with the end product, it is exactly what we wanted, and we would highly recommend their services."

Now we're reaching out to new clients and I want to target this client.
Here's their name: {name}
Here's their description (as per their google business): {description} (if it's empty ignore this)
I need you to convince them to have a call with myself and my designer to discuss creating a new website for them (or a coffee!)
Use the following copywriting style:
This style of copywriting is built on clarity, warmth, and relevance. It's conversational but purposeful—every word serves to either build trust, spark curiosity, or remove friction. You’re writing like a human, not a brand megaphone. The backbone of this approach comes from combining principles like AIDA (grab attention, build interest, create desire, prompt action) and PAS (Problem–Agitation–Solution), but softening them with genuine tone and empathy. You’re not pushing—you’re aligning with the reader’s needs and inviting them into a solution.
To write like this, you focus on them first: their context, their potential problem, and what you noticed about them that made you reach out. You speak plainly but with care—avoid jargon, avoid hype. Use simple, rhythmic sentence structure. Let your language sound like something you’d say out loud, but tighten it so there’s no fluff. Add light specificity (like “The osteo was down the road on Bolton Street”) to make it real. And always give them an easy next step—low pressure, low effort, clear benefit. When done well, this approach makes the receiver feel seen, not sold to. That’s what gets replies.
Also this is their address (on google businesses)
{address}
if it's in Eltham make sure to mention that I live just down the road. If not then they're all local so mention that I live in Eltham.
These sites were chosen because their sites need an upgrade and feel like they don't represent their brand well. Don't insult them with is information though.
Also this is their website url: {website}
Here are some quick notes we found from browsing their site:
{additionalNotes}
These emails will be going to their info@ email which is probably their reception so you should ask if they could forward the email on or give the details of the right person if I've got the wrong email
You should format your response in the following json:
{{"EmailBody": "the html for the email (just use p tags and a tags, no need to include the html or head or body or heading 1-6 or anything)", "Subject": "the subject line. Keep it short and eye catching but human, not like you're optimizing for opens (even though you are)"}}
""", isJson=True)
    print(emailDict)
    subject = emailDict["Subject"]
    body = emailDict["EmailBody"]
    return subject, body

async def main():
    # Open the CSV
    with open('clients.csv', encoding='utf-8', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            to_address = row['Email'].strip()
            name       = row['name'].strip()
            desc       = row['description'].strip()
            site       = row['website'].strip()
            addr       = row['address'].strip()
            
            print("\n\n\n\n##################NEW SITE##################")
            print(f"Name: {name}\n\nDescription: {desc}\n\nSite: {site}\n\nAddress: {addr}\n\n")
            notes = input("Notes to add:\n\n")
            
            # Generate subject & body via GPT
            subject, html_body = await generateEmail(
                name=name,
                description=desc,
                website=site,
                address=addr,
                additionalNotes=notes
            )
            
            # Send it
            try:
                input(html_body)
                sendEmail(to="wonk4040@gmail.com", subject=subject, html=html_body)
                print(f"✅ Sent to {to_address}")
            except Exception as e:
                print(f"❌ Failed to send to {to_address}: {e}")

if __name__ == '__main__':
    asyncio.run(main())

# # Test email to wonk4040@gmail.com
# if __name__ == "__main__":
#     r = sendEmail(
#         "info@essencechiropractic.com.au",
#         "Eltham Essence Wellness Website",
#         """
# <p>
# Hi Essence Chiropractic team,
# </p>
 
# <p>
# I'm Will, and together with Abbey (our designer), we run Lucent Studio here in Eltham.
# </p>
 
# <p>
# I came across your NSW site (essencechiropractic.com.au) and noticed that your Eltham domain (essencewellness.com.au) is currently showing a GoDaddy placeholder.
# </p>
 
# <p>
# We'd love to help you launch a dedicated site for Essence Wellness in Eltham that:
# </p>

# <ul>
#     <li>Uses a modern, mobile-first design</li>
#     <li>Makes bookings quick and easy for clients—and your team</li>
#     <li>Keeps your branding consistent across both locations</li>
# </ul>
  
# <p>
# We recently redesigned Embody Osteopathy's website (they're just down the road on Bolton Street), and they were thrilled with the results. Would you be open to a quick 10-minute call next week to explore how we could help? If there's someone else I should contact, feel free to forward this on or let me know.
# </p>

# <p>
# Looking forward to connecting!
# </p>
 
# <p>
#   Best regards,<br>
#   Will<br>
#   Lucent Studio<br>
#   0409 466 685<br>
# </p>
#         """,
#     )
#     print(r)
    