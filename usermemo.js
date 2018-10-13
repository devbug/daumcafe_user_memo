function escapeHTML(str) {
	return str.replace(/[&"'<>]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[m]);
}

function onMemosGot(result) {
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
			insert_a.setAttribute("onclick", "return false;");
			insert_a.href = "#";
			insert_a.style.fontSize = "11px";
			insert_a.style.color = "#aa22ff";
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
				delete_a.setAttribute("onclick", "return false;");
				delete_a.href = "#";
				delete_a.style.fontSize = "11px";
				delete_a.style.color = "#aa22ff";
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
				delete_a.setAttribute("onclick", "return false;");
				delete_a.href = "#";
				delete_a.style.fontSize = "11px";
				delete_a.style.color = "#aa22ff";
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
			insert_a.setAttribute("onclick", "return false;");
			insert_a.href = "#";
			insert_a.style.fontSize = "11px";
			insert_a.style.color = "#aa22ff";
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
			insert_a.setAttribute("onclick", "return false;");
			insert_a.href = "#";
			insert_a.style.fontSize = "11px";
			insert_a.style.color = "#aa22ff";
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
				delete_a.setAttribute("onclick", "return false;");
				delete_a.href = "#";
				delete_a.style.fontSize = "11px";
				delete_a.style.color = "#aa22ff";
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
			insert_a.setAttribute("onclick", "return false;");
			insert_a.href = "#";
			insert_a.style.fontSize = "11px";
			insert_a.style.color = "#aa22ff";
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
				delete_a.setAttribute("onclick", "return false;");
				delete_a.href = "#";
				delete_a.style.fontSize = "11px";
				delete_a.style.color = "#aa22ff";
				delete_a.innerText = "[-]";
				newMemo.appendChild(memo_span);
				newMemo.appendChild(delete_a);
			}

			strong_nickname.parentNode.appendChild(newMemo);
		}
	}
}

function refreshAggroMemos() {
	chrome.storage.sync.get(["daumcafe_usermemo"], onMemosGot);
}

function onMemoSave() {
	refreshAggroMemos();
}

function onBlocksGot(result) {
	var daumcafe_blockeduser;
	if (result instanceof Array) {
		daumcafe_blockeduser = result[0];
	}
	else {
		daumcafe_blockeduser = result.daumcafe_blockeduser;
	}
	if (!daumcafe_blockeduser) {
		daumcafe_blockeduser = []
	}

	var block_items = document.getElementsByClassName("aggro_blocks");
	while (block_items[0]) {
		block_items[0].parentNode.removeChild(block_items[0]);
	}

	var i, j, k;
	var re = /showSideView\(([^,]+),\s?'([^']+)',\s?'([^']+)'\);/;

	// 게시판 리스트
	var nicknames = document.getElementsByClassName("nick");
	for (i = 0; i < nicknames.length; i++) {
		var user_info = nicknames[i].innerHTML.match(re);
		if (user_info && user_info.length === 4) {
			var enc_userid = user_info[2];
			var username = user_info[3];
			var blocks = daumcafe_blockeduser.filter(item => {
				return item.encuserid === enc_userid;
			});

			var blocked_status = blocks.length > 0 ? true : false;

			for (j = 0; j < nicknames[i].childNodes.length; j++) {
				if (nicknames[i].childNodes[j].tagName === 'A') {
					nicknames[i].childNodes[j].innerText = blocked_status ? '차단된 사용자' : decodeURIComponent(JSON.parse(`"${username}"`));
					nicknames[i].childNodes[j].style.color = blocked_status ? "#ee2222" : null;
				}
			}

			var subjects = nicknames[i].parentNode.getElementsByClassName('subject');
			for (j = 0; j < subjects.length; j++) {
				for (k = 0; k < subjects[j].childNodes.length; k++) {
					if (subjects[j].childNodes[k].tagName)
						subjects[j].childNodes[k].style.display = blocked_status ? "none" : null;
				}
				if (blocked_status) {
					var blocked_msg = document.createElement('span');
					blocked_msg.classList.add('aggro_blocks');
					blocked_msg.style.color = "#ee2222";
					blocked_msg.innerText = '차단된 글입니다.';
					subjects[j].appendChild(blocked_msg);
				}
			}
		}
	}

	// 게시글 글쓴이
	var article_writers = document.getElementsByClassName("article_writer");
	for (i = 0; i < article_writers.length; i++) {
		var user_info = article_writers[i].innerHTML.match(re);
		if (user_info && user_info.length === 4) {
			var enc_userid = user_info[2];
			var username = user_info[3];
			var blocks = daumcafe_blockeduser.filter(item => {
				return item.encuserid === enc_userid;
			});

			var blocked_status = blocks.length > 0 ? true : false;

			var user_contents = document.getElementById('user_contents');
			if (user_contents) {
				user_contents.style.display = blocked_status ? "none" : null;

				if (blocked_status) {
					var blocked_msg = document.createElement('span');
					blocked_msg.classList.add('aggro_blocks');
					blocked_msg.style.color = "#ee2222";
					blocked_msg.innerText = "차단된 게시글입니다.";
					user_contents.parentNode.appendChild(blocked_msg);
				}
			}

			for (j = 0; j < article_writers[i].childNodes.length; j++) {
				if (article_writers[i].childNodes[j].tagName === 'A') {
					article_writers[i].childNodes[j].innerText = blocked_status ? '차단된 사용자' : decodeURIComponent(JSON.parse(`"${username}"`));
					article_writers[i].childNodes[j].style.color = blocked_status ? "#ee2222" : null;
				}
			}
		}
	}

	// 게시글 리플
	var reply_names = document.querySelectorAll('.id_admin > span > a');
	for (i = 0; i < reply_names.length; i++) {
		var user_info = reply_names[i].outerHTML.match(re);
		if (user_info && user_info.length === 4) {
			var enc_userid = user_info[2];
			var username = user_info[3];
			var blocks = daumcafe_blockeduser.filter(item => {
				return item.encuserid === enc_userid;
			});

			var blocked_status = blocks.length > 0 ? true : false;

			reply_names[i].innerText = blocked_status ? '차단된 사용자' : decodeURIComponent(JSON.parse(`"${username}"`));
			reply_names[i].style.color = blocked_status ? "#ee2222" : null;

			try {
				var parent = reply_names[i].parentNode.parentNode.parentNode;
				var comment_contents = parent.getElementsByClassName('comment_contents');
				for (j = 0; j < comment_contents.length; j++) {
					var comment_wrapper = comment_contents[j].parentNode;
					for (k = 0; k < comment_wrapper.childNodes.length; k++) {
						if (comment_wrapper.childNodes[k].tagName) {
							comment_wrapper.childNodes[k].style.display = blocked_status ? "none" : null;
						}
					}

					if (blocked_status) {
						var blocked_msg = document.createElement('span');
						blocked_msg.classList.add('aggro_blocks');
						blocked_msg.style.color = "#ee2222";
						blocked_msg.innerText = "차단된 댓글입니다.";
						comment_wrapper.appendChild(blocked_msg);
					}
				}
			}
			catch {}
		}
	}
}

function refreshAggroBlocks() {
	chrome.storage.sync.get(["daumcafe_blockeduser"], onBlocksGot);
}

function onBlockSave() {
	refreshAggroBlocks();
}

function notifyExtension(e) {
	// left click only
	if (e.button !== 0)
		return;

	var target = e.target;
	while (target.tagName != "A" && target.parentNode) {
		target = target.parentNode;
	}
	if (target.tagName != "A")
		return;

	if (target.hasAttribute('encuserid') && target.hasAttribute('username')) {
		if (target.hasAttribute('memo') && target.hasAttribute('insert')) {
			var memo = prompt("메모를 입력하세요.", target.attributes['memo'].value);
			if (memo !== null) {
				// console.log(`${target.attributes['username'].value} (${target.attributes['encuserid'].value}) => ${memo}`);

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

					// 수정을 위해, 이미 있으면 먼저 삭제
					var daumcafe_usermemo = memos.filter(item => {
						return item.encuserid !== target.attributes['encuserid'].value;
					});
					daumcafe_usermemo.push({
						'encuserid': target.attributes['encuserid'].value,
						'username': target.attributes['username'].value,
						'memo': memo
					});
					chrome.storage.sync.set({ "daumcafe_usermemo": daumcafe_usermemo }, onMemoSave);
				});
			}
		}
		else if (target.hasAttribute('memo') && target.hasAttribute('delete')) {
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
					chrome.storage.sync.set({ "daumcafe_usermemo": daumcafe_usermemo }, onMemoSave);
				});
			}
		}
		else if (target.hasAttribute('block')) {
			chrome.storage.sync.get(["daumcafe_blockeduser"], result => {
				var blocks;
				if (result instanceof Array) {
					blocks = result[0];
				}
				else {
					blocks = result.daumcafe_blockeduser;
				}
				if (!blocks)
					blocks = [];

				blocked_status = target.attributes['block_status'].value === 'true' ? true : false;

				// 이미 같은 항목이 있다면 필터링한 리스트 재생성
				var daumcafe_blockeduser = blocks.filter(item => {
					return item.encuserid !== target.attributes['encuserid'].value;
				});

				// 이미 차단된 상태라면
				if (blocked_status) {
					chrome.storage.sync.set({ "daumcafe_blockeduser": daumcafe_blockeduser }, onBlockSave);
				}
				// 차단되지 않은 상태이면서, 필터링한 리스트와 본래 리스트의 길이가 같다면,
				else if (blocks.length === daumcafe_blockeduser.length) {
					daumcafe_blockeduser.push({
						'encuserid': target.attributes['encuserid'].value,
						'username': target.attributes['username'].value,
						'timestamp': + new Date()
					});
					chrome.storage.sync.set({ "daumcafe_blockeduser": daumcafe_blockeduser }, onBlockSave);
				}
			});
		}
	}
	else if (target.hasAttribute('onclick') && target.attributes['onclick'].value.indexOf('showSideView') !== -1) {
		var re = /showSideView\(([^,]+),\s?'([^']+)',\s?'([^']+)'\);/;
		var user_info = target.attributes['onclick'].value.match(re);
		if (user_info && user_info.length === 4) {
			var enc_userid = user_info[2];
			var username = user_info[3];
			var nameContextMenu = document.getElementById('nameContextMenu');
			if (nameContextMenu !== undefined && nameContextMenu !== null) {
				var additional_items = nameContextMenu.getElementsByClassName('additional_items_to_block_user');
				while (additional_items[0]) {
					additional_items[0].parentNode.removeChild(additional_items[0]);
				}

				chrome.storage.sync.get(["daumcafe_blockeduser"], result => {
					var blocks;
					if (result instanceof Array) {
						blocks = result[0];
					}
					else {
						blocks = result.daumcafe_blockeduser;
					}
					if (!blocks)
						blocks = [];

					var daumcafe_blockeduser = blocks.filter(item => {
						return item.encuserid === enc_userid;
					});
					var blocked_status = daumcafe_blockeduser.length > 0 ? true : false;

					var dashed_li = document.createElement('li');
					dashed_li.classList.add('layer_dotline');
					dashed_li.classList.add('additional_items_to_block_user');
					nameContextMenu.firstChild.appendChild(dashed_li);

					var sideView_a = document.createElement('a');
					sideView_a.setAttribute('encuserid', enc_userid);
					sideView_a.setAttribute('username', username);
					sideView_a.setAttribute('block', 'true');
					sideView_a.setAttribute('block_status', blocked_status ? 'true' : 'false');
					sideView_a.setAttribute('onclick', 'hideSideView(); return false;');
					sideView_a.href = '#';
					sideView_a.innerText = blocked_status ? '차단해제' : '차단하기';

					var sideViewRow_li = document.createElement('li');
					sideViewRow_li.id = 'sideViewRow_block';
					sideViewRow_li.classList.add('additional_items_to_block_user');
					sideViewRow_li.appendChild(sideView_a);
					nameContextMenu.firstChild.appendChild(sideViewRow_li);
				});
			}
		}
	}
}

refreshAggroMemos();
refreshAggroBlocks();

window.addEventListener("click", notifyExtension);
