function onError(error) {
	console.log(`Error: ${error}`);
}

function escapeHTML(str) {
	return str.replace(/[&"'<>]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[m]);
}

function onGot(result) {
	var daumcafe_usermemo;
	if (result instanceof Array) {
		daumcafe_usermemo = result[0];
	}
	else {
		daumcafe_usermemo = result.daumcafe_usermemo;
	}
	if (!daumcafe_usermemo) {
		daumcafe_usermemo = []
	}

	var memos = document.getElementsByClassName("aggro_memo");
	while (memos[0]) {
		memos[0].parentNode.removeChild(memos[0]);
	}

	var i;
	var re = /showSideView\(([^,]+),\s?'([^']+)',\s?'([^']+)'\);/;

	// 게시판 리스트
	var nicknames = document.getElementsByClassName("nick");
	for (i = 0; i < nicknames.length; i++) {
		var user_info = nicknames[i].innerHTML.match(re);
		if (user_info && user_info.length === 4) {
			var memo = daumcafe_usermemo.filter(item => {
				return item.encuserid === user_info[2];
			});
			var enc_userid = user_info[2];
			var username = user_info[3];
			var memo_str = "";
			if (memo && memo.length > 0) {
				memo_str = escapeHTML(memo[0].memo);
			}

			var insert_a = document.createElement("a");
			insert_a.setAttribute("encuserid", enc_userid);
			insert_a.setAttribute("username", username);
			insert_a.setAttribute("memo", memo_str);
			insert_a.setAttribute("insert", "true");
			insert_a.style.marginLeft = "5px";
			insert_a.innerText = "[+]";

			var newMemo = document.createElement("SPAN");
			newMemo.classList.add("aggro_memo");
			newMemo.style.fontSize = "11px";
			newMemo.style.color = "#aa22ff";
			newMemo.appendChild(insert_a);

			if (memo_str !== "") {
				var br = document.createElement("br");
				var memo_span = document.createElement("span");
				memo_span.innerText = `${memo_str} `;
				var delete_a = document.createElement("a");
				delete_a.setAttribute("encuserid", enc_userid);
				delete_a.setAttribute("username", username);
				delete_a.setAttribute("memo", memo_str);
				delete_a.setAttribute("delete", "true");
				delete_a.innerText = "[-]";
				newMemo.appendChild(br);
				newMemo.appendChild(memo_span);
				newMemo.appendChild(delete_a);
			}

			nicknames[i].appendChild(newMemo);
		}
	}

	// 게시글 글쓴이
	var article_writers = document.getElementsByClassName("article_writer");
	for (i = 0; i < article_writers.length; i++) {
		var user_info = article_writers[i].innerHTML.match(re);
		if (user_info && user_info.length === 4) {
			var memo = daumcafe_usermemo.filter(item => {
				return item.encuserid === user_info[2];
			});
			var enc_userid = user_info[2];
			var username = user_info[3];
			var memo_str = "";
			if (memo && memo.length > 0) {
				memo_str = escapeHTML(memo[0].memo);

				var br = document.createElement("br");
				br.classList.add("aggro_memo");
				var aggro_memo = document.createElement("span");
				aggro_memo.classList.add("aggro_memo");
				aggro_memo.style.fontSize = "11px";
				aggro_memo.style.color = "#aa22ff";

				var memo_span = document.createElement("span");
				memo_span.innerText = `${memo_str}`;
				var delete_a = document.createElement("a");
				delete_a.setAttribute("encuserid", enc_userid);
				delete_a.setAttribute("username", username);
				delete_a.setAttribute("memo", memo_str);
				delete_a.setAttribute("delete", "true");
				delete_a.style.marginLeft = "5px";
				delete_a.innerText = "[-]";
				aggro_memo.appendChild(memo_span);
				aggro_memo.appendChild(delete_a);

				article_writers[i].appendChild(br);
				article_writers[i].appendChild(aggro_memo);
			}

			var insert_a = document.createElement("a");
			insert_a.setAttribute("encuserid", enc_userid);
			insert_a.setAttribute("username", username);
			insert_a.setAttribute("memo", memo_str);
			insert_a.setAttribute("insert", "true");
			insert_a.style.marginLeft = "5px";
			insert_a.innerText = "[+]";

			var newMemo = document.createElement("SPAN");
			newMemo.classList.add("aggro_memo");
			newMemo.style.fontSize = "11px";
			newMemo.style.color = "#aa22ff";
			newMemo.appendChild(insert_a);

			article_writers[i].insertBefore(newMemo, article_writers[i].childNodes[2]);
		}
	}

	// 게시글 리플
	var reply_names = document.getElementsByClassName("id_admin");
	for (i = 0; i < reply_names.length; i++) {
		var user_info = reply_names[i].innerHTML.match(re);
		if (user_info && user_info.length === 4) {
			var memo = daumcafe_usermemo.filter(item => {
				return item.encuserid === user_info[2];
			});
			var enc_userid = user_info[2];
			var username = user_info[3];
			var memo_str = "";
			if (memo && memo.length > 0) {
				memo_str = escapeHTML(memo[0].memo);
			}

			var null_span = document.createElement("span");
			null_span.innerText = " ";
			var insert_a = document.createElement("a");
			insert_a.setAttribute("encuserid", enc_userid);
			insert_a.setAttribute("username", username);
			insert_a.setAttribute("memo", memo_str);
			insert_a.setAttribute("insert", "true");
			insert_a.innerText = "[+]";

			var newMemo = document.createElement("SPAN");
			newMemo.classList.add("aggro_memo");
			newMemo.style.fontSize = "11px";
			newMemo.style.color = "#aa22ff";
			newMemo.appendChild(null_span);
			newMemo.appendChild(insert_a);

			if (memo_str !== "") {
				var memo_span = document.createElement("span");
				memo_span.innerText = ` ${memo_str} `;
				var delete_a = document.createElement("a");
				delete_a.setAttribute("encuserid", enc_userid);
				delete_a.setAttribute("username", username);
				delete_a.setAttribute("memo", memo_str);
				delete_a.setAttribute("delete", "true");
				delete_a.innerText = "[-]";
				newMemo.appendChild(memo_span);
				newMemo.appendChild(delete_a);
			}

			reply_names[i].insertBefore(newMemo, reply_names[i].childNodes[2]);
		}
	}

	// 작성 글 보기
	var member_form = document.getElementsByClassName("member_article_search_form");
	for (i = 0; i < member_form.length; i++) {
		var j;
		var enc_userid = null;
		var nickname = null;
		for (j = 0; j < member_form[i].length; j++) {
			if (member_form[i][j].name === "enc_userid")
				enc_userid = member_form[i][j].value;
			else if (member_form[i][j].name === "nickname")
				nickname = member_form[i][j].value;
		}
		var strong_nickname = null;
		var strongs = member_form[i].getElementsByTagName('strong');
		for (j = 0; j < strongs.length; j++) {
			if (strongs[j].id === 'nickname') {
				strong_nickname = strongs[j];
				break;
			}
		}
		if (enc_userid !== null && nickname !== null && strong_nickname !== null) {
			var memo = daumcafe_usermemo.filter(item => {
				return item.encuserid === enc_userid;
			});
			var memo_str = "";
			if (memo && memo.length > 0) {
				memo_str = escapeHTML(memo[0].memo);
			}

			var null_span = document.createElement("span");
			null_span.innerText = " ";
			var insert_a = document.createElement("a");
			insert_a.setAttribute("encuserid", enc_userid);
			insert_a.setAttribute("username", nickname);
			insert_a.setAttribute("memo", memo_str);
			insert_a.setAttribute("insert", "true");
			insert_a.innerText = "[+]";

			var newMemo = document.createElement("SPAN");
			newMemo.classList.add("aggro_memo");
			newMemo.style.fontSize = "11px";
			newMemo.style.color = "#aa22ff";
			newMemo.appendChild(null_span);
			newMemo.appendChild(insert_a);

			if (memo_str !== "") {
				var memo_span = document.createElement("span");
				memo_span.innerText = ` ${memo_str} `;
				var delete_a = document.createElement("a");
				delete_a.setAttribute("encuserid", enc_userid);
				delete_a.setAttribute("username", nickname);
				delete_a.setAttribute("memo", memo_str);
				delete_a.setAttribute("delete", "true");
				delete_a.innerText = "[-]";
				newMemo.appendChild(memo_span);
				newMemo.appendChild(delete_a);
			}

			strong_nickname.parentNode.appendChild(newMemo);
		}
	}
}

function refreshAggroMemos() {
	browser.storage.sync.get("daumcafe_usermemo").then(onGot, onError);
}

function onSave() {
	refreshAggroMemos();
}

function notifyExtension(e) {
	// left click only
	if (e.button !== 0)
		return;

	var target = e.target;
	while ((target.tagName != "A" || !target.hasAttribute('encuserid') || !target.hasAttribute('username') || !target.hasAttribute('memo')) && target.parentNode) {
		target = target.parentNode;
	}
	if (target.tagName != "A")
		return;

	if (target.hasAttribute('insert')) {
		var memo = prompt("메모를 입력하세요.", target.attributes['memo'].value);
		if (memo !== null) {
			// console.log(`${target.attributes['username'].value} (${target.attributes['encuserid'].value}) => ${memo}`);

			browser.storage.sync.get("daumcafe_usermemo").then(result => {
				var memos;
				if (result instanceof Array) {
					memos = result[0];
				}
				else {
					memos = result.daumcafe_usermemo;
				}
				if (!memos)
					memos = [];

				// 수정을 위해, 이미 있으면 먼저 삭제
				var daumcafe_usermemo = memos.filter(item => {
					return item.encuserid !== target.attributes['encuserid'].value;
				});
				daumcafe_usermemo.push({
					'encuserid': target.attributes['encuserid'].value,
					'username': target.attributes['username'].value,
					'memo': memo
				});
				browser.storage.sync.set({ daumcafe_usermemo }).then(onSave, onError);
			}, onError);
		}
	}
	else if (target.hasAttribute('delete')) {
		var remove = confirm('정말 메모를 삭제하시겠습니까?');
		if (remove) {
			browser.storage.sync.get("daumcafe_usermemo").then(result => {
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
				browser.storage.sync.set({ daumcafe_usermemo }).then(onSave, onError);
			}, onError);
		}
	}
}

refreshAggroMemos();

window.addEventListener("click", notifyExtension);
