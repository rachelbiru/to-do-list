
import { Request, Response, NextFunction, Application } from 'express';
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');




import { connect } from '../database';
import { User } from '../interface/User'




export async function createUser(req: Request, res: Response) {
    const conn = await connect();
    body('email', 'Invalid email address!').isEmail().custom((value: string) => {
        return conn.query('SELECT `email` FROM `users` WHERE `email`=?', [value])
            .then(([rows]: any) => {
                if (rows.length > 0) {
                    return res.json('This E-mail already exist');
                }
                return true;
            });
    }),
        body('user_name', 'Username is Empty!').trim().not().isEmpty(),
        body('password', 'The password must be of minimum length 6 characters').trim().isLength({ min: 6 })
    // end of post data validation

    const validation_result = validationResult(req);
    const { name, email, password }: User = req.body;
    // IF validation_result HAS NO ERROR
    if (validation_result.isEmpty()) {
        // password encryption (using bcryptjs)
        bcrypt.hash(password, 12).then((hash_pass: any) => {
            // INSERTING USER INTO DATABASE
            conn.query("INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)", [name, email, hash_pass])
                .then(result => {
                    res.send(`your account has been created successfully`);
                }).catch(err => {
                    // THROW INSERTING USER ERROR'S
                    if (err) throw err;
                });
        })
            .catch((err: any) => {
                // THROW HASHING ERROR'S
                if (err) throw err;
            })
    }
    else {
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error: any) => {
            return error.msg;
        });
        // REVERING login-register PAGE WITH VALIDATION ERRORS
        res.render('login-register', {
            register_error: allErrors,
            old_data: req.body
        });
    }
}


// this.app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     maxAge:  3600 * 1000 // 1hr
// }));




// const ifNotLoggedin = (req: Request, res: Response, next: NextFunction) => {
//     if(!req.session.isLoggedIn){
//         return res.render('login-register');
//     }
//     next();
// }

// const ifLoggedin = (req,res,next) => {
//     if(req.session.isLoggedIn){
//         return res.redirect('/home');
//     }
//     next();
// }





export async function login(req: Request, res: Response) {
    const conn = await connect();

    body('email').custom(async (value: any) => {
        type NewType = any;

        const [rows]: NewType = await conn.query('SELECT `email` FROM `users` WHERE `email`=?', [value]);
        if ((rows.length) == 1) {
            return true;
        }
        return Promise.reject('Invalid Email Address!');
    });


    body('password', 'Password is empty!').trim().not().isEmpty(),
        (req: Request, res: Response) => {
            const validation_result = validationResult(req);
            const { password, email } = req.body;

            if (validation_result.isEmpty()) {

                conn.query("SELECT * FROM `users` WHERE `email`=?", [email])
                    .then(([rows]: any) => {
                        bcrypt.compare(password, rows[0].password).then((compare_result: any) => {
                            if (compare_result === true) {
                                //  req.session.isLoggedIn = true;
                                // req.session.userID = rows[0].id;
                                res.json('success')

                                res.redirect('/');
                            }
                            else {
                                res.render('login-register', {
                                    login_errors: ['Invalid Password!']
                                });
                            }
                        })
                            .catch((err: any) => {
                                if (err) throw err;
                            });


                    }).catch(err => {
                        if (err) throw err;
                    });
            }
            else {
                let allErrors = validation_result.errors.map((error: any) => {
                    return error.msg;
                });
                // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
                res.render('login-register', {
                    login_errors: allErrors
                });
            }
        }

}