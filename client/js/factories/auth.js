vibe.factory('auth', function($http, $window, $rootScope){
	var auth = {};

	auth.saveToken = function(token){
		$window.localStorage["vibe-token"] = token;
	}

	auth.getToken = function(){
		return $window.localStorage['vibe-token'];
	}

	auth.isLoggedIn = function() {
		var token = auth.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false
		}
	}

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload;
		}
	}

	auth.register = function(user){
		return $http.post('/register', user).success(function(data){
			auth.saveToken(data.token)

			// $rootScope.$broadcast('currentUser', {user: data.user})
			// $rootScope.$emit('currentUser', {user: data.user})
		});
	};

	auth.stripeRegister = function(user){
	return $http.post('/authorize', user).success(function(){
		//  $window.location.href = "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_85HBoyAWwpEv8c4XhKzTSHsPUvrza10d&scope=read_write"

		})
	}

	auth.stripeSave = function(user, callback){
		 $http.post('/saveStripeInfo', user).success(function(results){
			 callback(results);
		 })
	}

	auth.logIn = function(user, callback){
		return $http.post('/loginUser', user).success(function(data){
		auth.saveToken(data.token);
		})
	}

	auth.logOut = function(){
		$window.localStorage.removeItem('vibe-token')
	}

	return auth;
})
