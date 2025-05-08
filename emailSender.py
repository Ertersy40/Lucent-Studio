# Send an email from hello@lucent.studio with resend.com
import os
import resend
from dotenv import load_dotenv
load_dotenv()

resend.api_key = os.environ.get("RESEND_API_KEY")

def sendEmail(to, subject, html):
    params = {
        "from": "will@lucent.studio",
        "to": to,
        "subject": subject,
        "html": html,
    }

    r = resend.Emails.send(params)
    return r

# Test email to wonk4040@gmail.com
if __name__ == "__main__":
    r = sendEmail(
        "abbeyperkin@gmail.com",
        "Test email",
        """<p>Hi Essence Chiropractic team,</p>

  <p>
    Abbey (our UX designer), and I run
    Lucent Studio in Eltham where we build polished, high-performance websites. I love your NSW site
    essencechiropractic.com.au, but noticed that
    essencewellness.com.au in Eltham is still showing a GoDaddy placeholder.
  </p>

  <p>
    We'd love to help launch an Essence Wellness site in Eltham that:
  </p>

  <ul>
    <li>Inspires trust with a modern, mobile-first design</li>
    <li>Makes bookings quick and easy</li>
    <li>Keeps your branding consistent across both locations</li>
  </ul>

  <p>
    We just finished redesigning <a href="https://embodyosteopathy.com">Embody Osteopathy's</a> site (they're just down the road on bolton street), and they were thrilled with the results!
  </p>

  <p>
    Would a 10-minute call next week work for you? If there's someone else I should speak to, please let me know or feel free to forward this on.
  </p>

  <p>Thanks, and I look forward to chatting!</p>

  <p>
    Cheers,<br>
    Will<br>
    <a href="https://lucent.studio">Lucent Studio</a><br>
    0409 466 685<br>
  </p>""",
    )
    print(r)
    