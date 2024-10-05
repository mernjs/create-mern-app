from flask import current_app, render_template
from flask_mail import Message, Mail

def send_mail(template_id, subject, data):
    try:
        with current_app.app_context():
            mail = Mail(current_app)
            html_content = render_template(f"{template_id}.html", data=data)
            msg = Message(
                subject=subject,
                recipients=[data.email],
                html=html_content
            )
            mail.send(msg)
            print(f"Welcome email sent to {data.email}")
    except Exception as e:
        print(f"Failed to send email: {e}")

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS