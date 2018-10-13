function saveOptions(e) {
	if (e.defaultPrevented) {
		return;
	}

	function onSave(result) {
		restoreOptions();
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

	chrome.storage.sync.set({ "daumcafe_usermemo": daumcafe_usermemo }, onSave);
}

function removeMemo(enc_userid) {
	var remove = confirm('정말 메모를 삭제하시겠습니까?');
	if (remove) {
		function onSave(result) {
			restoreOptions();
		}

		chrome.storage.sync.get(["daumcafe_usermemo"], result => {
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
			chrome.storage.sync.set({ "daumcafe_usermemo": daumcafe_usermemo }, onSave);
		});
	}
}

function removeButtonOnClick(e) {
	// left click only
	if (e.button !== 0)
		return;

	var target = e.target;
	while ((target.tagName != "BUTTON" || !target.hasAttribute('encuserid') || !target.hasAttribute("itemtype")) && target.parentNode) {
		target = target.parentNode;
	}
	if (target.tagName != "BUTTON")
		return;

	function onSave(result) {
		restoreOptions();
	}

	if (target.attributes['itemtype'].value === 'memo') {
		var remove = confirm('정말 메모를 삭제하시겠습니까?');
		if (remove) {
			chrome.storage.sync.get(["daumcafe_usermemo"], result => {
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
				chrome.storage.sync.set({ "daumcafe_usermemo": daumcafe_usermemo }, onSave);
			});
		}
	}
	else if (target.attributes['itemtype'].value === 'block') {
		var remove = confirm('정말 차단 항목을 삭제하시겠습니까?');
		if (remove) {
			chrome.storage.sync.get(["daumcafe_blockeduser"], result => {
				var memos;
				if (result instanceof Array) {
					memos = result[0];
				}
				else {
					memos = result.daumcafe_blockeduser;
				}
				if (!memos)
					memos = [];

				var daumcafe_blockeduser = memos.filter(item => {
					return item.encuserid !== target.attributes['encuserid'].value;
				});
				chrome.storage.sync.set({ "daumcafe_blockeduser": daumcafe_blockeduser }, onSave);
			});
		}
	}
}

function escapeHTML(str) {
	return str.replace(/[&"'<>]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[m]);
}

function restoreOptions() {

	function onMemosGot(result) {
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
		var tbody = document.querySelector("#user_memos");
		while (tbody.firstChild) {
			tbody.removeChild(tbody.firstChild);
		}

		for (i = 0; i < daumcafe_usermemo.length; i++) {
			var username = decodeURIComponent(JSON.parse(`"${daumcafe_usermemo[i].username}"`));
			var username_input = document.createElement('input');
			username_input.classList.add("readonly");
			username_input.classList.add("inputtext");
			username_input.type = "text";
			username_input.id = "username";
			username_input.value = escapeHTML(username);
			username_input.readOnly = true;
			var username_td = document.createElement('td');
			username_td.classList.add("username");
			username_td.appendChild(username_input);

			var enc_userid_input = document.createElement('input');
			enc_userid_input.classList.add("readonly");
			enc_userid_input.classList.add("inputtext");
			enc_userid_input.type = "text";
			enc_userid_input.id = "enc_userid";
			enc_userid_input.value = escapeHTML(daumcafe_usermemo[i].encuserid);
			enc_userid_input.readOnly = true;
			var enc_userid_td = document.createElement('td');
			enc_userid_td.classList.add("enc_userid");
			enc_userid_td.appendChild(enc_userid_input);

			var memo_input = document.createElement('input');
			memo_input.type = "text";
			memo_input.id = "memo";
			memo_input.value = escapeHTML(daumcafe_usermemo[i].memo);
			var memo_td = document.createElement('td');
			memo_td.classList.add("memo");
			memo_td.appendChild(memo_input);

			var delete_button_input = document.createElement('button');
			delete_button_input.classList.add("delete_button");
			delete_button_input.setAttribute("encuserid", escapeHTML(daumcafe_usermemo[i].encuserid));
			delete_button_input.setAttribute("itemtype", "memo");
			delete_button_input.innerText = "X";
			var delete_button_td = document.createElement('td');
			delete_button_td.appendChild(delete_button_input);

			var tr = document.createElement('tr');
			tr.appendChild(username_td);
			tr.appendChild(enc_userid_td);
			tr.appendChild(memo_td);
			tr.appendChild(delete_button_td);

			tbody.appendChild(tr);
		}
	}

	function onBlocksGot(result) {
		var daumcafe_blockeduser;
		if (result instanceof Array) {
			daumcafe_blockeduser = result[0];
		}
		else {
			daumcafe_blockeduser = result.daumcafe_blockeduser;
		}
		if (!daumcafe_blockeduser)
			daumcafe_blockeduser = []

		var i;
		var tbody = document.querySelector("#user_blocks");
		while (tbody.firstChild) {
			tbody.removeChild(tbody.firstChild);
		}

		for (i = 0; i < daumcafe_blockeduser.length; i++) {
			var username = decodeURIComponent(JSON.parse(`"${daumcafe_blockeduser[i].username}"`));
			var username_td = document.createElement('td');
			username_td.classList.add("block");
			username_td.classList.add("username");
			username_td.innerText = escapeHTML(username);

			var enc_userid_td = document.createElement('td');
			enc_userid_td.classList.add("block");
			enc_userid_td.classList.add("enc_userid");
			enc_userid_td.innerText = escapeHTML(daumcafe_blockeduser[i].encuserid);

			var timestamp_td = document.createElement('td');
			timestamp_td.classList.add("block");
			timestamp_td.classList.add("timestamp");
			timestamp_td.innerText = escapeHTML(new Date(daumcafe_blockeduser[i].timestamp).toLocaleString());

			var reason_td = document.createElement('td');
			reason_td.classList.add("block");
			reason_td.classList.add("reason");
			reason_td.innerText = escapeHTML(daumcafe_blockeduser[i].reason);

			var delete_button_input = document.createElement('button');
			delete_button_input.classList.add("block");
			delete_button_input.classList.add("delete_button");
			delete_button_input.setAttribute("encuserid", escapeHTML(daumcafe_blockeduser[i].encuserid));
			delete_button_input.setAttribute("itemtype", "block");
			delete_button_input.innerText = "X";
			var delete_button_td = document.createElement('td');
			delete_button_td.appendChild(delete_button_input);

			var tr = document.createElement('tr');
			tr.appendChild(username_td);
			tr.appendChild(enc_userid_td);
			tr.appendChild(timestamp_td);
			tr.appendChild(reason_td);
			tr.appendChild(delete_button_td);

			tbody.appendChild(tr);
		}
	}

	chrome.storage.sync.get(["daumcafe_usermemo"], onMemosGot);
	chrome.storage.sync.get(["daumcafe_blockeduser"], onBlocksGot);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
window.addEventListener("click", removeButtonOnClick);
