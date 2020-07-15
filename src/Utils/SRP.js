import { millerRabinInt, sub, multMod, mod, modInt, negative, add, str2bigInt, bigInt2str, getBpe, getOne, copyInt_, copy_, add_, rightShift_, sub_, eGCD_, divide_, equalsInt, greater, isZero, powMod, mult } from './leemonBigInt'
import { sha256HashSync } from './utils';

export function SRP(accountPassword) {
	let algo = accountPassword.current_algo;

	this._algo = algo;

	this._salt1 = algo.salt1;
	this._salt2 = algo.salt2;
	this._g = algo.g;
	this._p = algo.p;

	this._srp_B = accountPassword.srp_B;
	this._srp_id = accountPassword.srp_id;
	this._secure_random = accountPassword.secure_random;

	if (!this.goodPrime(this._p, this._g)) {
		throw new Error('Invalid p/g');
	}
};

SRP.prototype.goodPrime = function(prime, g) {
	// const expectedBitLength = 2048 / 8; //  /8 = 256

	if (prime.length != 256) {
		return false;
	}
	if (prime[0] < 128) { // and that 2^2047 < p < 2^2048), means the first bit should be 1
		return false;
	}

	// Since g is always equal to 2, 3, 4, 5, 6 or 7, this is easily done using quadratic reciprocity law,
	// yielding a simple condition on p mod 4g — namely,
	// p mod 8 = 7 for g = 2;
	// p mod 3 = 2 for g = 3;
	// no extra condition for g = 4;
	// p mod 5 = 1 or 4 for g = 5;
	// p mod 24 = 19 or 23 for g = 6;
	// and p mod 7 = 3, 5 or 6 for g = 7.

	let primeB = this.BIGFROMUINTA(prime);

	if (g == 2) {
		if (modInt(primeB, 8) != 7) {
			return false;
		}
	} else if (g == 3) {
		if (modInt(primeB, 3) != 2) {
			return false;
		}
	} else if (g == 4) {

	} else if (g == 5) {
		if ([1,4].indexOf(modInt(primeB, 5)) == -1) {
			return false;
		}
	} else if (g == 6) {
		if ([19,23].indexOf(modInt(primeB, 24)) == -1) {
			return false;
		}
	} else if (g == 7) {
		if ([3,5,6].indexOf(modInt(primeB, 7)) == -1) {
			return false;
		}
	} else {
		return false; // g is something different
	}

	let subprimeB = sub(primeB, getOne()); // sub
	rightShift_(subprimeB, 1); // and div by 2

	const smallPrimes = [3,5];

	for (let smallPrime of smallPrimes) {
		if (!millerRabinInt(primeB, smallPrime)) {
			return false;
		}
		if (!millerRabinInt(subprimeB, smallPrime)) {
			return false;
		}
	}

	return true;
}

SRP.prototype.randomA = function() {
	let a = new Uint8Array(256);
	// console.error('secure_random', this._secure_random);
	a.set(this._secure_random);
	// for (let i = 0; i < a.length; i++) {
	// 	if (Math.random() < 0.5) {
	// 		a[i] = Math.floor(Math.random()*250);
	// 	}
	// }

	// console.error('secure_random', a);
	return a;
};

SRP.prototype.getInputCheckPasswordSRP = function(thePassword) {
	return new Promise((res, rej)=>{
		this.generate(thePassword)
			.then((m1)=>{
				res({
					"_": "inputCheckPasswordSRP",
					srp_id: this._srp_id,
					A: this._A_bytes,
					M1: this._m1
				});
			});
	});
}

SRP.prototype.generate = function(thePassword) {
	return new Promise((res, rej)=>{

		let _passwordA = new TextEncoder().encode(thePassword);

		// try with mr.slavik python
		//
		let p_bytes = this._p;
		let p = this.BIGFROMUINTA(p_bytes);

		let g_bytes = this.PAD([this._g], 256); // 2048 / 8
		let g = str2bigInt(''+this._g, 10); // g is number

		let B_bytes = this._srp_B;
		let B = this.BIGFROMUINTA(B_bytes);

				// console.log('_passwordA', _passwordA);
				// console.log('this._salt1', this._salt1);
				// console.log('this._salt2', this._salt2);

		// x := PH2(password, salt1, salt2)
		this.PH2(_passwordA, this._salt1, this._salt2)
			.then((x_bytes)=>{

				// console.log('x_bytes', x_bytes);


				let x = this.BIGFROMUINTA(x_bytes);

				let g_x = powMod(g, x, p);

				let k_bytes = this.H(this.CONCAT(p_bytes, g_bytes));
				let k = this.BIGFROMUINTA(k_bytes);

				let kg_x = multMod(k, g_x, p);

				// console.log('kg_x', this.UINTAFROMBIG(kg_x));

				let a = null;
				let A = null;
				let A_bytes = null;
				let u = null;
				let u_bytes = null;
				while(true) {
					this._a = this.randomA();
					a  = this.BIGFROMUINTA(this._a);
					A = powMod(g, a, p);
					A_bytes = this.UINTAFROMBIG(A);

					this._A_bytes = A_bytes;

					u_bytes = this.H(this.CONCAT(A_bytes, B_bytes));
					u = this.BIGFROMUINTA(u_bytes);

					if (!negative(u)) {
						break;
					}
				}

				while(!greater(B, kg_x)) {
					B = add(B, p);
				}

				let g_b = mod(sub(B, kg_x), p);
				if (negative(g_b)) {
					g_b = add(g_b, p);
				}
				let ux = mult(u,x);

				let a_ux = add(a, ux);

				// console.log('a_ux', this.UINTAFROMBIG(a_ux));


				let S = powMod(g_b, a_ux, p);
				let S_bytes = this.UINTAFROMBIG(S);

				// console.log('S_bytes', S_bytes);

				let K_bytes = this.H(S_bytes);

				let h1 = this.H(p_bytes);
				let h2 = this.H(g_bytes);

				let p1 = this.XOR(h1, h2);
				let p2 = this.H(this._salt1);
				let p3 = this.H(this._salt2);
				let p4 = A_bytes;
				let p5 = B_bytes;
				let p6 = K_bytes;


				// console.log(p1);
				// console.log(p2);
				// console.log(p3);
				// console.log(p4);
				// console.log(p5);
				// console.log(p6);

				let concated = new Uint8Array(p1.length+p2.length+p3.length+p4.length+p5.length+p6.length);
				concated.set(p1, 0);
				concated.set(p2, p1.length);
				concated.set(p3, p1.length+p2.length);
				concated.set(p4, p1.length+p2.length+p3.length);
				concated.set(p5, p1.length+p2.length+p3.length+p4.length);
				concated.set(p6, p1.length+p2.length+p3.length+p4.length+p5.length);

				this._m1 = this.H(concated);

				res(this._m1);
			});

	});
};

SRP.prototype.XOR = function(uint8Array1, uint8Array2) {
	let ret = new Uint8Array(uint8Array2);
	for (let i = 0; i < uint8Array1.length; i++) {
		ret[i] = uint8Array1[i] ^ uint8Array2[i];
	}

	return ret;
};

SRP.prototype.PAD = function(bytes, length) {
	let padded = new Uint8Array(length);
	padded.set(bytes, length - bytes.length);

	return padded;
};

SRP.prototype.CONCAT = function(a1, a2) {
	const concated = new Uint8Array(a1.length+a2.length);
	concated.set(a1);
	concated.set(a2, a1.length);
	return concated;
};

SRP.prototype.bytesFromHex = function(hexString) {
    var len = hexString.length,
        i
    var start = 0
    var bytes = []

    if (hexString.length % 2) {
        bytes.push(parseInt(hexString.charAt(0), 16))
        start++
    }

    for (i = start; i < len; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16))
    }

    return new Uint8Array(bytes);
};

SRP.prototype.bytesToHex = function(uint8Array) {
	let arr = [];
	for (let i = 0; i < uint8Array.length; i++) {
		arr.push((uint8Array[i] < 16 ? "0" : "") + (uint8Array[i] || 0).toString(16));
	}
	return arr.join("");
};

SRP.prototype.BIGFROMUINTA = function(uint8Array) {
	return str2bigInt(this.bytesToHex(uint8Array), 16, Math.ceil(64 / getBpe()) + 1);
};

SRP.prototype.UINTAFROMBIG = function(big) {
	let str = bigInt2str(big, 16);
	return this.bytesFromHex(str);
};

	// H(data) := sha256(data)
SRP.prototype.H = function(data) {
	// let digest = await window.crypto.subtle.digest('SHA-256', data);
	// console.warn(data, digest, new Uint8Array(digest));
	return new Uint8Array(sha256HashSync(data));
	// return new Uint8Array(window.crypto.subtle.digest('SHA-256', data));
};

	// SH(data, salt) := H(salt | data | salt)
SRP.prototype.SH = function(data, salt) {
	const concated = new Uint8Array(salt.length + data.length + salt.length);
	concated.set(salt);
	concated.set(data, salt.length);
	concated.set(salt, salt.length + data.length);

	return this.H(concated);
};

	// PH1(password, salt1, salt2) := SH(SH(password, salt1), salt2)
SRP.prototype.PH1 = function(password, salt1, salt2) {
	let h1 = this.SH(password, salt1);
	return this.SH(h1, salt2);
};

	// PH2(password, salt1, salt2) := SH(pbkdf2(sha512, PH1(password, salt1, salt2), salt1, 100000), salt2)
SRP.prototype.PH2 = function(password, salt1, salt2) {
	return new Promise((res, rej)=>{
		let ph1 = this.PH1(password, salt1, salt2);
		// console.log('ph1', ph1);
		this.PBKDF2(ph1, salt1, 100000)
			.then((pbk)=>{
		// console.log('pbk', pbk);
				res(this.SH(pbk, salt2));
			})
			.catch((e)=>{
				rej(e);
			});
	});
};

SRP.prototype.PBKDF2 = function(hash, salt, iterations) {
		// console.log('hash', hash);
	return new Promise((res, rej)=>{
		crypto.subtle.importKey("raw",hash,{ name: "PBKDF2" },false,["deriveBits", "deriveKey"])
			.then((importKey)=>{
				return crypto.subtle.deriveKey(
						{ name: "PBKDF2", hash: "SHA-512", iterations: 100000, salt: salt },
						importKey,
						{ name: "HMAC", hash: "SHA-256" },
						true,
						["sign"]
					);
			})
			.then((deriveKey)=>{
				return crypto.subtle.exportKey("raw", deriveKey);
			})
			.then((exportKey)=>{
				res(new Uint8Array(exportKey));
			})
			.catch((e)=>{
				rej(e);
			});
	});
};