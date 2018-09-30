function saveOptions(e) {
	if (e.defaultPrevented) {
		return;
	}

	function onSave(result) {
		restoreOptions();
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	var daumcafe_usermemo = [];
	var i;
	var userMemos = document.getElementById("user_memos");
	for (i = 0; i < userMemos.childElementCount; i++) {
		var j;
		var enc_userid = null;
		var username = null;
		var memo = null;
		for (j = 0; j < userMemos.childNodes[i].childElementCount; j++) {
			if (userMemos.childNodes[i].childNodes[j].className === "username")
				username = userMemos.childNodes[i].childNodes[j].childNodes[0].value;
			else if (userMemos.childNodes[i].childNodes[j].className === "enc_userid")
				enc_userid = userMemos.childNodes[i].childNodes[j].childNodes[0].value;
			else if (userMemos.childNodes[i].childNodes[j].className === "memo")
				memo = userMemos.childNodes[i].childNodes[j].childNodes[0].value;
		}

		if (enc_userid !== null && username !== null && memo !== null) {
			daumcafe_usermemo.push({
				'encuserid': enc_userid,
				'username': username,
				'memo': memo
			});
		}
	}

	browser.storage.local.set({ daumcafe_usermemo }).then(onSave, onError);
}

function removeMemo(enc_userid) {
	var remove = confirm('정말 메모를 삭제하시겠습니까?');
	if (remove) {
		function onSave(result) {
			restoreOptions();
		}

		function onError(error) {
			console.log(`Error: ${error}`);
		}

		browser.storage.local.get("daumcafe_usermemo").then(result => {
			var memos;
			if (result instanceof Array) {
				memos = result[0];
			}
			else {
				memos = result.daumcafe_usermemo;
			}
			if (!memos)
				memos = [];

			var daumcafe_usermemo = memos.filter(item => {
				return item.encuserid !== enc_userid;
			});
			browser.storage.local.set({ daumcafe_usermemo }).then(onSave, onError);
		}, onError);
	}
}

function removeButtonOnClick(e) {
	// left click only
	if (e.button !== 0)
		return;

	var target = e.target;
	while ((target.tagName != "BUTTON" || !target.hasAttribute('encuserid')) && target.parentNode) {
		target = target.parentNode;
	}
	if (target.tagName != "BUTTON")
		return;

	var remove = confirm('정말 메모를 삭제하시겠습니까?');
	if (remove) {
		function onSave(result) {
			restoreOptions();
		}

		function onError(error) {
			console.log(`Error: ${error}`);
		}

		browser.storage.local.get("daumcafe_usermemo").then(result => {
			var memos;
			if (result instanceof Array) {
				memos = result[0];
			}
			else {
				memos = result.daumcafe_usermemo;
			}
			if (!memos)
				memos = [];

			var daumcafe_usermemo = memos.filter(item => {
				return item.encuserid !== target.attributes['encuserid'].value;
			});
			browser.storage.local.set({ daumcafe_usermemo }).then(onSave, onError);
		}, onError);
	}
}

function restoreOptions() {

	function onGot(result) {
		var daumcafe_usermemo;
		if (result instanceof Array) {
			daumcafe_usermemo = result[0];
		}
		else {
			daumcafe_usermemo = result.daumcafe_usermemo;
		}
		if (!daumcafe_usermemo)
			daumcafe_usermemo = [];

		var i;
		var html = "";
		var tbody = document.querySelector("#user_memos");
		for (i = 0; i < daumcafe_usermemo.length; i++) {
			var username = decodeURIComponent(JSON.parse(`"${daumcafe_usermemo[i].username}"`));
			html += "<tr>";
			html += `<td class="username"><input class="readonly inputtext" type="text" id="username" value="${username}" readonly /></td>`;
			html += `<td class="enc_userid"><input class="readonly inputtext" type="text" id="enc_userid" value="${daumcafe_usermemo[i].encuserid}" readonly /></td>`;
			html += `<td class="memo"><input type="text" id="memo" value="${daumcafe_usermemo[i].memo}" /></td>`;
			html += `<td><button id="delete_button" encuserid="${daumcafe_usermemo[i].encuserid}">X</button></td>`;
			html += "</tr>";
		}
		tbody.innerHTML = html;
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	browser.storage.local.get("daumcafe_usermemo").then(onGot, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
window.addEventListener("click", removeButtonOnClick);
