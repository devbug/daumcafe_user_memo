function escapeHTML(str) {
	return str.replace(/[&"'<>]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[m]);
}

function decodeHtml(html) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
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

	var articles = [];
	var articles_re = /articles.push\(\{((.|\n)*?)\}\);/g;
	var articles_info = document.body.innerHTML.match(articles_re);
	if (articles_info)
		articles_info.forEach(element => eval(element));

	var i;

	// 게시판 리스트
	var nicknames = document.querySelectorAll("#article-list > tr > td.td_writer");
	for (i = 0; i < nicknames.length; i++) {
		var memo = daumcafe_usermemo.filter(item => {
			return item.encuserid === articles[i]['encUserId'];
		});
		var enc_userid = articles[i]['encUserId'];
		var username = articles[i]['author'];
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
		// insert_a.style.marginLeft = "5px";
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

	// 게시글 글쓴이
	var article_writers = document.querySelectorAll('div.cover_info > a');
	for (i = 0; i < article_writers.length; i++) {
		var memo = daumcafe_usermemo.filter(item => {
			return item.encuserid === article_writers[i].getAttribute('data-enc-userid');
		});
		var enc_userid = article_writers[i].getAttribute('data-enc-userid');
		var username = article_writers[i].getAttribute('data-nickname');
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

			article_writers[i].parentNode.appendChild(br);
			article_writers[i].parentNode.appendChild(aggro_memo);
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
		// insert_a.style.marginLeft = "5px";
		insert_a.innerText = "[+]";

		var newMemo = document.createElement("SPAN");
		newMemo.classList.add("aggro_memo");
		newMemo.classList.add("txt_item");
		newMemo.style.fontSize = "11px";
		newMemo.style.color = "#aa22ff";
		newMemo.appendChild(insert_a);

		article_writers[i].parentNode.insertBefore(newMemo, article_writers[i].parentNode.childNodes[2]);
	}

	// 게시글 리플
	var reply_names = document.getElementsByClassName("txt_name");
	for (i = 0; i < reply_names.length; i++) {
		var memo = daumcafe_usermemo.filter(item => {
			return item.encuserid === reply_names[i].getAttribute('data-enc-userid');
		});
		var enc_userid = reply_names[i].getAttribute('data-enc-userid');
		var username = reply_names[i].getAttribute('data-nickname');
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

		reply_names[i].parentNode.appendChild(newMemo);
	}

	// 더 보기 글 목록
	var more_article_list = document.getElementById('more-article-list');
	if (more_article_list !== undefined && moreMenuContainer !== null) {
		var _url = new URL(more_article_list.baseURI);
		var CAFEAPP = {};
		eval(document.head.innerHTML.match(/CAFEAPP.ui\s*=\s*\{((.|\n)*?)\};/g)[0]);
		var url = `${_url.protocol}//${_url.hostname}/_c21_/bottom/articles?grpid=${_url.searchParams.get('grpid')}&fldid=${CAFEAPP.ui.FLDID}&contentval=${CAFEAPP.ui.PARBBSDEPTH}`;
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.onload = function () {
			var jsonResponse = JSON.parse(request.responseText);
			var articles = jsonResponse['articles'];

			var nicknames = document.querySelectorAll("#more-article-list > tr > td.td_writer");
			for (i = 0; i < nicknames.length; i++) {
				var memo = daumcafe_usermemo.filter(item => {
					return item.encuserid === articles[i]['encUserid'];
				});
				var enc_userid = articles[i]['encUserid'];
				var username = articles[i]['nickname'];
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
				// insert_a.style.marginLeft = "5px";
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
		};
		request.send();
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

	var i;

	var articles = [];
	var articles_re = /articles.push\(\{((.|\n)*?)\}\);/g;
	var articles_info = document.body.innerHTML.match(articles_re);
	if (articles_info)
		articles_info.forEach(element => eval(element));

	// 게시판 리스트
	var article_list = document.querySelectorAll("#article-list > tr");
	for (i = 0; i < articles.length; i++) {
		var enc_userid = articles[i]['encUserId'];
		var username = decodeHtml(articles[i]['author']);
		var blocks = daumcafe_blockeduser.filter(item => {
			return item.encuserid === enc_userid;
		});

		var blocked_status = blocks.length > 0 ? true : false;
		try {
			var txt_writer = article_list[i].getElementsByClassName('txt_writer')[0];
			txt_writer.innerText = blocked_status ? '차단된 사용자' : username;
			txt_writer.style.color = blocked_status ? "#ee2222" : null;

			var title_wrapper = article_list[i].getElementsByClassName('title_wrapper')[0];
			title_wrapper.style.display = blocked_status ? "none" : null;

			if (blocked_status) {
				var blocked_msg = document.createElement('span');
				blocked_msg.classList.add('aggro_blocks');
				blocked_msg.style.color = "#ee2222";
				blocked_msg.innerText = '차단된 글입니다.';
				title_wrapper.parentNode.appendChild(blocked_msg);
			}
		}
		catch {}
	}

	// 게시글 글쓴이
	var article_writers = document.querySelectorAll('div.cover_info > a');
	for (i = 0; i < article_writers.length; i++) {
		var enc_userid = article_writers[i].getAttribute('data-enc-userid');
		var username = decodeHtml(article_writers[i].getAttribute('data-nickname'));
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

		article_writers[i].innerText = blocked_status ? '차단된 사용자' : username;
		article_writers[i].style.color = blocked_status ? "#ee2222" : null;
	}

	// 게시글 리플
	var replies = document.querySelectorAll('#comment_view > ul.list_comment > li');
	for (i = 0; i < replies.length; i++) {
		var enc_userid = replies[i].getAttribute('data-userid');
		var username = decodeHtml(replies[i].getAttribute('data-nickname'));
		var blocks = daumcafe_blockeduser.filter(item => {
			return item.encuserid === enc_userid;
		});

		var blocked_status = blocks.length > 0 ? true : false;

		try {
			reply_name = replies[i].getElementsByClassName('txt_name')[0];
			reply_name.innerText = blocked_status ? '차단된 사용자' : username;
			reply_name.style.color = blocked_status ? "#ee2222" : null;

			var comment_contents = replies[i].getElementsByClassName('box_post')[0];
			comment_contents.style.display = blocked_status ? "none" : null;
			if (blocked_status) {
				var blocked_msg = document.createElement('span');
				blocked_msg.classList.add('aggro_blocks');
				blocked_msg.style.color = "#ee2222";
				blocked_msg.innerText = "차단된 댓글입니다.";
				comment_contents.parentNode.appendChild(blocked_msg);
			}
		}
		catch {}
	}

	// 더 보기 글 목록
	var more_article_list = document.getElementById('more-article-list');
	if (more_article_list !== undefined && moreMenuContainer !== null) {
		var _url = new URL(more_article_list.baseURI);
		var CAFEAPP = {};
		eval(document.head.innerHTML.match(/CAFEAPP.ui\s*=\s*\{((.|\n)*?)\};/g)[0]);
		var url = `${_url.protocol}//${_url.hostname}/_c21_/bottom/articles?grpid=${_url.searchParams.get('grpid')}&fldid=${CAFEAPP.ui.FLDID}&contentval=${CAFEAPP.ui.PARBBSDEPTH}`;
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.onload = function () {
			var jsonResponse = JSON.parse(request.responseText);
			var articles = jsonResponse['articles'];

			var article_list = document.querySelectorAll("#more-article-list > tr");
			for (i = 0; i < articles.length; i++) {
				var enc_userid = articles[i]['encUserid'];
				var username = decodeHtml(articles[i]['nickname']);
				var blocks = daumcafe_blockeduser.filter(item => {
					return item.encuserid === enc_userid;
				});
		
				var blocked_status = blocks.length > 0 ? true : false;
				try {
					var txt_writer = article_list[i].getElementsByClassName('txt_writer')[0];
					txt_writer.innerText = blocked_status ? '차단된 사용자' : username;
					txt_writer.style.color = blocked_status ? "#ee2222" : null;
		
					var title_wrapper = article_list[i].getElementsByClassName('title_wrapper')[0];
					title_wrapper.style.display = blocked_status ? "none" : null;
		
					if (blocked_status) {
						var blocked_msg = document.createElement('span');
						blocked_msg.classList.add('aggro_blocks');
						blocked_msg.style.color = "#ee2222";
						blocked_msg.innerText = '차단된 글입니다.';
						title_wrapper.parentNode.appendChild(blocked_msg);
					}
				}
				catch {}
			}
		};
		request.send();
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
					var reason = prompt("차단 사유를 입력하세요.");
					if (reason === null || reason === undefined)
						reason = '';

					daumcafe_blockeduser.push({
						'encuserid': target.attributes['encuserid'].value,
						'username': target.attributes['username'].value,
						'reason': reason,
						'timestamp': new Date().toISOString()
					});
					chrome.storage.sync.set({ "daumcafe_blockeduser": daumcafe_blockeduser }, onBlockSave);
				}
			});
		}
		else if (target.hasAttribute('block2')) {
			var moreMenuContainer = document.getElementById('more-menu-container');
			if (moreMenuContainer !== undefined && moreMenuContainer !== null) {
				var re = /javascript:goArticle\('([^,]*?)',\s*[^,]*?,\s*'([^,]*?)',\s*[^,]*?,\s*[^,]*?\)/;
				var user_info = moreMenuContainer.innerHTML.match(re);
				if (user_info) {
					var enc_userid = user_info[1];
					var username = user_info[2];
		
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

						// 이미 같은 항목이 있다면 필터링한 리스트 재생성
						var daumcafe_blockeduser = blocks.filter(item => {
							return item.encuserid !== enc_userid;
						});

						// 이미 차단된 상태라면
						if (blocked_status) {
							chrome.storage.sync.set({ "daumcafe_blockeduser": daumcafe_blockeduser }, onBlockSave);
						}
						// 차단되지 않은 상태이면서, 필터링한 리스트와 본래 리스트의 길이가 같다면,
						else if (blocks.length === daumcafe_blockeduser.length) {
							var reason = prompt("차단 사유를 입력하세요.");
							if (reason === null || reason === undefined)
								reason = '';

							daumcafe_blockeduser.push({
								'encuserid': enc_userid,
								'username': username,
								'reason': reason,
								'timestamp': new Date().toISOString()
							});
							chrome.storage.sync.set({ "daumcafe_blockeduser": daumcafe_blockeduser }, onBlockSave);
						}
					});
				}
			}
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

function appendMoreMemuToContainer()
{
	var moreMenuContainer = document.getElementById('more-menu-container');
	if (moreMenuContainer !== undefined && moreMenuContainer !== null
		&& moreMenuContainer.children.length > 0 && moreMenuContainer.children[0].children.length > 0
		&& moreMenuContainer.children[0].children[0].children.length == 4
	) {
		var additional_items = moreMenuContainer.getElementsByClassName('additional_items_to_block_user');
		while (additional_items && additional_items[0]) {
			additional_items[0].parentNode.removeChild(additional_items[0]);
		}

		var moreMenu_a = document.createElement('a');
		moreMenu_a.setAttribute('encuserid', '');
		moreMenu_a.setAttribute('username', '');
		moreMenu_a.setAttribute('block2', 'true');
		moreMenu_a.setAttribute('onclick', 'window.MoreMenuLayer.hide(); return false;');
		moreMenu_a.classList.add('link_menu');
		moreMenu_a.href = '#';
		moreMenu_a.innerText = '차단/해제';

		var moreMenuRow_div = document.createElement('div');
		moreMenuRow_div.id = 'moreMenuRow_block';
		moreMenuRow_div.classList.add('menu_item');
		moreMenuRow_div.classList.add('additional_items_to_block_user');
		moreMenuRow_div.appendChild(moreMenu_a);
		moreMenuContainer.children[0].children[0].appendChild(moreMenuRow_div);
	}
}

refreshAggroMemos();
refreshAggroBlocks();

document.addEventListener("click", notifyExtension);

var moreMenuContainer = document.getElementById('more-menu-container');
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.type === 'childList') {
			appendMoreMemuToContainer();
		}
	});
});
if (moreMenuContainer) {
	observer.observe(moreMenuContainer, {
		childList: true, subtree: true
	});
}
