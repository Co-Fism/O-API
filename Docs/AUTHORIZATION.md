# Authorization
### 0.15.3
### Co-Fism

## Overview

Authorization determines what an authenticated user is allowed to do within the application.

O-API uses user roles to distinguish permissions and access levels. Authentication identifies the user, while authorization determines whether the user can perform a specific operation.

## User Roles

The application currently uses three primary roles:

| Role | Description |
|---|---|
| `USER` | Regular customer account |
| `SELLER` | Seller account |
| `ADMIN` | Administrative account |

## Role Responsibilities

### USER

Regular users can access customer-related functionality.

Their authentication can be completed through OTP verification, and they do not require password authentication in the standard OTP flow.

### SELLER

Seller accounts are protected accounts.

Logging in requires:

1. OTP verification
2. Password verification
3. Successful account validation

An access token is issued after successful authentication.

### ADMIN

Administrative accounts follow the same protected authentication process as sellers.

They must verify their OTP and password before receiving an access token.

## Protected Account Authentication

`ADMIN` and `SELLER` accounts require an additional password verification step.

After successful OTP verification, the system temporarily stores a verification flag in Redis:

`otp_verified:${userId}`

The flag has a limited lifetime and is used during password authentication.

After successful password login, the flag is deleted.

## Account Status

Authorization and account status are separate concerns.

A valid role does not automatically mean that an account is allowed to log in.

The User service checks `user.canLogin()` during password authentication to ensure that the account is permitted to continue.

## Role Management

The User module includes functionality for administrative user management.

An administrator can:

- Promote a regular user.
- Block a user.
- Unblock a user.
- Change user roles through administrative functionality.

Promotion logic checks that the requesting user has administrative management permission and that the target user is eligible for promotion.

## Important

Having a valid access token does not necessarily mean that every operation is permitted.

Access control should be enforced at the application or endpoint level based on the required role and permissions.

Authentication, authorization, and account status should remain separate responsibilities.
