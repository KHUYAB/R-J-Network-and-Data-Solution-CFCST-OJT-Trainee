from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = "netconnect-secret-key"  # Required for session

# Demo user (static)
DEMO_USER = {
    "email": "admin@gmail.com",
    "password": "admin123"
}

@app.route('/')
def home():
    return render_template('index.html', title='Home')

@app.route('/services')
def services():
    return render_template('services.html', title='Services')

@app.route('/about')
def about():
    return render_template('about.html', title='About Us')

@app.route('/team')
def team():
    return render_template('team.html', title='Our Team')

@app.route('/contact')
def contact():
    return render_template('contact.html', title='Contact')

# LOGIN
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        if email == DEMO_USER['email'] and password == DEMO_USER['password']:
            session['user'] = email
            return redirect(url_for('home'))
        else:
            error = "Invalid email or password"
    return render_template('login.html', title='Login', error=error)

# FORGOT PASSWORD
@app.route('/forgot', methods=['GET', 'POST'])
def forgot_password():
    message = None
    msg_type = "danger"
    if request.method == 'POST':
        email = request.form.get('email')
        if not email.endswith('@gmail.com'):
            message = "Error: Only Gmail addresses (@gmail.com) are allowed."
            msg_type = "danger"
        elif email == DEMO_USER['email']:
            message = "A reset link has been sent to your Gmail account."
            msg_type = "success"
        else:
            message = "Email address not found."
            msg_type = "danger"
    return render_template('forgot.html', title='Forgot Password', message=message, msg_type=msg_type)

# LOGOUT
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

# REGISTER (STATIC)
@app.route('/register')
def register():
    return render_template('register.html', title='Register')

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)
