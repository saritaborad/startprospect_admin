import React, { useState, useEffect } from "react";
import { FetchGetApi, FetchPostApi } from "../Api/apiServices";
import { API_Path } from "../Api/Const";
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Pages/firebase";
import { toast } from "react-toastify";

const Context = React.createContext("");

export function RoleStore(props) {

	const [profiledata, setprofiledata] = useState("");
	const [loginuserdata, setloginuserdata] = useState();
	const [user_id, setuser_id] = useState("");
	const [signup_type, setsignup_type] = useState("");
	const [country, setcountry] = useState("");
	const [profilDetails, setprofilDetails] = useState("");
	const [profilePicture, setprofilePicture] = useState('');
	const [cover_img, setcover_img] = useState("");
	const [flag, setFlag] = useState(true);
	const [social, setSocial] = useState("");
	const [socialPopUp, setSocialPopUp] = useState(false);

	const provider = new GoogleAuthProvider();
	const provider2 = new FacebookAuthProvider();
	const provider3 = new OAuthProvider("apple.com");

	provider.setCustomParameters({
		promt: "select_account",
	});

	useEffect(() => {
		if (user_id === "" || signup_type === "") {
			set_user_login_data();
		}
	}, [user_id, signup_type])

	useEffect(() => {
		if (country === "") {
			country_code_get();
		}
	}, [country])

	useEffect(() => {
		if (user_id !== "") {
			switch (signup_type) {
				case 1: getBusinessProfile(user_id);
					break;
				case 2: getAthleteProfile(user_id);
					break;
				case 3: getProfiledata(user_id);
					break;
				case 4: getParentProfile(user_id);
					break;
				case 5: getFanProfile(user_id);
					break;
			}
		}
	}, [user_id, signup_type]);

	const set_user_login_data = async () => {
		let token = localStorage.getItem("strusertoken");
		if (token !== null) {
			let userRole = await parseJwt(token);
			setsignup_type(userRole.signupType);
			setuser_id(userRole.id);
		}
	};

	const getBusinessProfile = async (user_id) => {
		let result = await FetchPostApi(API_Path.businessProfile, { user_id: user_id });
		let getProfile = await result.json();
		if (result.status === 200) {
			setprofiledata(getProfile.data[0]);
			setprofilePicture(getProfile.data[0].profile_img)
			setFlag(false);
		}
	};

	const getProfiledata = async (user_id) => {
		let result = await FetchPostApi(API_Path.coachProfile, { user_id: user_id });
		let getProfile = await result.json();
		if (result.status === 200) {
			setprofiledata(getProfile?.data[0]);
			setprofilePicture(getProfile?.data[0]?.profile_img)
			setFlag(false);
		}
	};

	const getAthleteProfile = async () => {
		let result = await FetchPostApi(API_Path.athleteProfile, { user_id: user_id });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setprofilePicture(getAthlete.data[0].profile_img)
			setcover_img(getAthlete?.data[0]?.cover_img)
		} else {
			toast.error(getAthlete.message);
		}
	};

	const getParentProfile = async (user_id) => {
		let result = await FetchPostApi(API_Path.parentProfile, { user_id: user_id });
		let getProfile = await result.json();
		if (result.status === 200) {
			setprofiledata(getProfile.data[0]);
			setprofilePicture(getProfile.data[0].profile_img)
			setFlag(false);
		}
	};

	const getFanProfile = async (user_id) => {
		let result = await FetchPostApi(API_Path.fanProfile, { user_id: user_id });
		let getProfile = await result.json();
		if (result.status === 200) {
			setprofiledata(getProfile.data);
			setprofilePicture(getProfile.data.profile_img)
			setFlag(false);
		}
	};

	const country_code_get = async () => {
		let country = await FetchGetApi(`https://ipapi.co/json/`);
		if (country.status === 200) {
			country = await country.json();
			setcountry(country.country.toLowerCase());
		}
	};

	const parseJwt = (token) => {
		return new Promise((resolve, reject) => {
			var base64Url = token.split(".")[1];
			var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
			var jsonPayload = decodeURIComponent(
				window
					.atob(base64)
					.split("")
					.map(function (c) {
						return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join("")
			);
			resolve(JSON.parse(jsonPayload));
		});
	};

	const facebookLogin = () => {
		return new Promise((resolve, reject) => {
			signInWithPopup(auth, provider2)
				.then((result) => {
					setprofiledata(result.user);
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	const googleLogin = () => {
		return new Promise((resolve, reject) => {
			signInWithPopup(auth, provider)
				.then((result) => {
					setprofiledata(result.user);
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	const appleLogin = () => {
		return new Promise((resolve, reject) => {
			signInWithPopup(auth, provider3)
				.then((result) => {
					setprofiledata(result.user);
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	const newEmail = function (email) {
		var split = email?.split("@");
		var split1 = split?.[0];
		var avg = split1?.length / 2;
		split1 = split1?.substring(0, split1?.length - avg);
		let split2 = split?.[1];
		return split1 + "...@" + split2;
	};

	const phoneNumber = function (Mnumber) {
		const last4Digits = Mnumber?.slice(-4);
		const maskedNumber = last4Digits?.padStart(Mnumber.length, "*");
		return maskedNumber;
	};

	const handleGoogleLogin = async () => {
		googleLogin().then(async ({ _tokenResponse }) => {
			try {
				setSocial(_tokenResponse);
				setSocialPopUp(true);
			} catch (error) {
				console.log(error);
			}
		});
	};

	const handleFacebookLogin = async () => {
		facebookLogin().then(async ({ _tokenResponse }) => {
			try {
				setSocial(_tokenResponse);
				setSocialPopUp(true);
			} catch (error) {
				console.log(error);
			}
		});
	};

	return (
		<Context.Provider
			value={{
				...{
					user_id,
					signup_type,
					profiledata,
					loginuserdata,
					country,
					profilDetails,
					flag,
					profilePicture,
					facebookLogin,
					googleLogin,
					appleLogin,
					social,
					socialPopUp,
					cover_img,
				},
				getProfiledata,
				parseJwt,
				setloginuserdata,
				setuser_id,
				setsignup_type,
				setprofilDetails,
				setprofilePicture,
				setcover_img,
				newEmail,
				phoneNumber,
				handleGoogleLogin,
				handleFacebookLogin,
				getBusinessProfile,
				getParentProfile,
				getFanProfile,
				getAthleteProfile

			}}
		>
			{props.children}
		</Context.Provider>
	);
}

export default Context;
