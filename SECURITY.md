# 🔒 Security Guide

## Critical Security Measures Implemented

### 1. Helmet.js - HTTP Security Headers
Protects against:
- XSS (Cross-Site Scripting)
- Clickjacking
- MIME sniffing
- Other common web vulnerabilities

### 2. Rate Limiting
- Prevents brute force attacks
- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables

### 3. CORS (Cross-Origin Resource Sharing)
- Restricts API access to specific origins
- Production: Only allows specified domains
- Development: Allows localhost

### 4. NoSQL Injection Protection
- express-mongo-sanitize removes malicious query operators
- Prevents MongoDB injection attacks

### 5. Password Security
- bcryptjs with salt rounds
- Passwords never stored in plain text
- Passwords not returned in API responses

### 6. JWT Authentication
- Secure token-based authentication
- Token expires after 7 days
- Tokens signed with secret key

### 7. Input Validation
- express-validator for request validation
- Schema validation in MongoDB models
- Minimum length requirements

### 8. Environment Variables
- Sensitive data not hardcoded
- .env files excluded from git
- Separate configs for dev/prod

---

## 🚨 Pre-Deployment Security Checklist

### Essential (Must Do)

- [ ] **Generate Strong JWT Secret**
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
  Paste result in `JWT_SECRET` environment variable

- [ ] **Use MongoDB Atlas or Secured MongoDB**
  - Enable authentication
  - Use strong passwords
  - Restrict IP access
  - Enable encryption at rest

- [ ] **Configure CORS**
  ```env
  ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
  ```

- [ ] **Enable HTTPS/SSL**
  - Use Let's Encrypt for free SSL
  - Force HTTPS redirect
  - Set secure cookie flags

- [ ] **Change Default Passwords**
  - MongoDB admin password
  - Any database user passwords

- [ ] **Set Production Environment**
  ```env
  NODE_ENV=production
  ```

- [ ] **Review .gitignore**
  - Ensure .env files not committed
  - Check no secrets in git history

### Recommended

- [ ] **Enable MongoDB Audit Logging**
- [ ] **Set Up Firewall Rules**
- [ ] **Implement Request Body Size Limits** (Already done: 10mb)
- [ ] **Add Content Security Policy**
- [ ] **Enable Database Backups**
- [ ] **Set Up Monitoring/Alerts**
- [ ] **Implement API Documentation with Auth Examples**
- [ ] **Add Request Logging** (Already done: morgan)
- [ ] **Regular Security Updates**
  ```bash
  npm audit
  npm audit fix
  ```

### Advanced

- [ ] **Two-Factor Authentication (2FA)**
- [ ] **API Key Authentication for Services**
- [ ] **IP Whitelisting**
- [ ] **DDoS Protection (Cloudflare)**
- [ ] **Database Encryption**
- [ ] **Regular Penetration Testing**
- [ ] **OWASP Top 10 Compliance**

---

## 🔐 Security Best Practices

### JWT Secret Generation
**NEVER use weak or exposed secrets in production!**

Generate secure secret:
```bash
# Method 1: Node.js crypto
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 2: OpenSSL
openssl rand -base64 64

# Method 3: Linux/Mac
head /dev/urandom | LC_ALL=C tr -dc 'A-Za-z0-9' | head -c 64
```

### Password Requirements
Enforce in frontend:
- Minimum 8 characters (current: 6, consider increasing)
- Mix of uppercase, lowercase, numbers
- Special characters recommended

### API Security
```javascript
// Already implemented:
- JWT token verification
- User authentication middleware
- Request validation
- Error handling without exposing internals
```

### Database Security
```javascript
// MongoDB Connection Security:
- Use connection string with authentication
- Enable SSL/TLS for connections
- Limit user permissions (principle of least privilege)
- Regular backups
```

---

## 🛡️ Protecting Sensitive Data

### Environment Variables
Never commit:
- Database credentials
- API keys
- JWT secrets
- Third-party service keys

### Git Security
Check for exposed secrets:
```bash
# Install git-secrets
git secrets --install
git secrets --register-aws
```

Remove secrets from history:
```bash
# Use BFG Repo-Cleaner or git-filter-repo
bfg --delete-files .env
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

---

## 🚦 Rate Limiting Configuration

### Current Settings
```env
RATE_LIMIT_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100     # 100 requests
```

### Recommendations by Endpoint Type
- **Login/Register**: 5-10 requests per 15 min
- **General API**: 100 requests per 15 min
- **Public endpoints**: 50 requests per 15 min

### Implementation Example
```javascript
// Strict rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

app.use('/api/auth', authLimiter);
```

---

## 🔍 Security Monitoring

### What to Monitor
- Failed login attempts
- Rate limit hits
- Database connection errors
- Unusual API patterns
- 4xx/5xx error rates

### Logging Best Practices
```javascript
// Already implemented:
- Morgan for HTTP request logging
- Error logging in controllers
- Environment-based log levels
```

### Recommended Tools
- **Application Monitoring**: New Relic, DataDog
- **Error Tracking**: Sentry, Rollbar
- **Log Management**: Loggly, Papertrail
- **Uptime Monitoring**: UptimeRobot, Pingdom

---

## 🔒 HTTPS/SSL Setup

### Using Let's Encrypt (Free)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

### Force HTTPS
Add to nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 🚨 Incident Response

### If Security Breach Detected

1. **Immediate Actions**
   - Disable affected services
   - Rotate all secrets (JWT, database passwords)
   - Review access logs
   - Identify breach vector

2. **Investigation**
   - Check logs for unauthorized access
   - Review recent code changes
   - Scan for malware/backdoors
   - Document findings

3. **Remediation**
   - Patch vulnerabilities
   - Update dependencies
   - Strengthen security measures
   - Notify affected users if needed

4. **Prevention**
   - Implement additional security layers
   - Increase monitoring
   - Regular security audits
   - Team security training

---

## 📚 Security Resources

### Stay Updated
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Node.js Security Best Practices: https://nodejs.org/en/docs/guides/security/
- MongoDB Security: https://docs.mongodb.com/manual/security/
- npm Security Advisories: https://www.npmjs.com/advisories

### Regular Security Tasks
- Weekly: Check npm audit
- Monthly: Review access logs
- Quarterly: Security audit
- Annually: Penetration testing

---

**Last Updated:** December 28, 2025
**Security Level:** Production Ready ✅
