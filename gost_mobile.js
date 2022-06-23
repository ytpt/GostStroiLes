let w = window.innerWidth;
if (w <= 641 ) {

    const oldMenu = document.querySelector('#mainmenu');
    oldMenu.style.display = 'none';

    const mainMenuBlock = document.querySelector('#main_menu');
    const mainMenuBox = document.querySelector('#main_menu_box');
    const menu = document.createElement('div');
    menu.classList.add('menu_top');

    const burgerBlock = document.createElement('div');
    let burgerMenu = `
        <div class="nav-toggle">
            <div class="toggle-botton">
                <div class="top-left"></div>
                <div class="top-right"></div>
                <div class="middle"></div>
                <div class="bottom-left"></div>
                <div class="bottom-right"></div>
            </div>
        </div>
        <div class="overlay">
            <nav class="main-nav">
                <ul class='burger_menu_list'></ul>
            </nav>
        </div>
    `;

    burgerBlock.innerHTML = burgerMenu;
    burgerBlock.querySelector('div.nav-toggle').addEventListener('click', function(){
        const categoriesBtn = document.querySelector('#main_menu nav .animated-icon1');
        if (categoriesBtn.classList.contains('open')){
            categoriesBtn.click();
        }
    });

    let burgerBlockUL = burgerBlock.querySelector('nav.main-nav > ul.burger_menu_list');

    oldMenu.querySelectorAll('.level1').forEach(li => {
        li.style.listStyle = 'none';
        burgerBlockUL.innerHTML += li.outerHTML;
    });

    menu.prepend(burgerBlock);

    $(function(){
        $('.toggle-botton').on('click',function(){
        $('.nav-toggle').toggleClass('is-active')
        })
        
        $('.main-nav li a').on('click',function(){
        $('.nav-toggle').toggleClass('is-active');
        })
    });

    const logo = document.querySelector('#banner1 img');
    const logoLink = document.createElement('a');
    logoLink.classList.add('logo_block');
    logoLink.href = "/index";
    logoLink.append(logo);
    menu.prepend(logoLink);

    let catalogList = [];
    const catalogLiElems = document.querySelectorAll('#uc_cats > ul > li');

    if (catalogLiElems){
        catalogLiElems.forEach(li => {
            catalogList.push(buildCatalogItem(li));
        });

        document.querySelector('#uc_cats').closest('.module').style.display = 'none';
    }

    function buildCatalogItem(li){
        let item = {
            name: li.querySelector('span > a').innerHTML,
            link: li.querySelector('span > a').getAttribute("href"),
            subCategories: []
        }

        const subCategoriesElem = li.querySelectorAll('ul > li');

        if (subCategoriesElem){
            subCategoriesElem.forEach(subLi => {
                item.subCategories.push(buildCatalogItem(subLi))
            });
        }

        return item;
    }

    let navElem = `
        <nav class="navbar navbar-light amber lighten-4 mb-4">
            <a class="navbar-brand" href="#">Каталог товаров</a>
            <button class="navbar-toggler first-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent20"aria-controls="navbarSupportedContent20" aria-expanded="false" aria-label="Toggle navigation">
                <div class="animated-icon1">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent20">
                <ul class="navbar-nav mr-auto"></ul>
            </div>
        </nav>
    `;

    mainMenuBlock.innerHTML = navElem;

    let categoriesList = document.querySelector('.navbar-nav');

    catalogList.forEach(item => {
        categoriesList.innerHTML += buildNavCategoryHTML(item);
    })

    function buildNavCategoryHTML(category){
        let subHTML = '';

        if (category.subCategories){

            category.subCategories.forEach(subCategory => {
                subHTML += buildNavCategoryHTML(subCategory);
            })
        }

        let html = `
        <li class="nav-item">
            <a class="nav-link" href="${category.link}">${category.name}</a>
            ${subHTML}
        </li>`;

        return html;
    }

    $(document).ready(function () {

        $('.first-button').on('click', function () {
    
        $('.animated-icon1').toggleClass('open');
        });
        $('.second-button').on('click', function () {
    
        $('.animated-icon2').toggleClass('open');
        });
        $('.third-button').on('click', function () {
    
        $('.animated-icon3').toggleClass('open');
        });
    });

    mainMenuBox.prepend(menu);

    // Btn up
    let btnUp = document.createElement('div');
    btnUp.setAttribute('id','up')
    btnUp.innerHTML = `<img src='/templates/ic_newsbox3/images/btnUp.png' alt='burger-menu' width='60' heigh='60' />`
    btnUp.addEventListener('click', function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })
    document.getElementById('wrap_100').append(btnUp);

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnUp.style.display = "block";
        } else {
            btnUp.style.display = "none";
        }
    }

    //Btn contacts
    let btnContacts = document.createElement('div');
    btnContacts.setAttribute('id','contacts-btn');
    btnContacts.innerHTML = `<img src='/templates/ic_newsbox3/images/contactsBtn.png' alt='Кнопка обратной связи' width='80' heigh='80' />`;
        
    let contactsBlock = document.createElement('div');
    contactsBlock.setAttribute('id', 'contacts-block');
    let recall = document.querySelector('.phone-top a').innerHTML;
    const recallHref = document.querySelector('.phone-top a').href;
    
    let contactsContent = `
        <div class='contacts-info'> 
            <a href='tg//resolve?domain=GostStroiLes'> 
                <img src='/templates/ic_newsbox3/images/telegram.png' alt='Телеграм' width='50' heigh='50' />
                <span>Telegram</>
            </a>
            <a href='https://api.whatsapp.com/send/?phone=79258985601&text=Здравствуйте%2C+у+меня+есть+вопрос'> 
                <img src='/templates/ic_newsbox3/images/WhatsApp.png' alt='Вотсап' width='50' heigh='50' />
                <span>WhatsApp</>
            <a href='mailto:goststroiles@mail.ru'> 
                <img src='/templates/ic_newsbox3/images/e-mail.png' alt='Электронная почта' width='50' heigh='50' />
                <span>goststroiles@mail.ru</>
            </a>
            <a href="tel:+79258985601"> 
                <img src='/templates/ic_newsbox3/images/callBack.png' alt='Позвонить' width='50' heigh='50' />
                <span>Позвонить</span>
            </a>
            <a class='recall' href=${recallHref}>${recall}</a>
        </div>
        </div>
    `;
    contactsBlock.innerHTML = contactsContent;

    btnContacts.addEventListener('click', () => {
        contactsBlock.classList.toggle('show');
    })

    document.getElementById('wrap_100').append(btnContacts);
    document.getElementById('wrap_100').append(contactsBlock);

    // Products list
    const productsTable = document.querySelector('#prodList');

    if (productsTable) {
        const productsInTable = productsTable.querySelectorAll('tbody tr');
        
        productsElem = document.createElement('div');
        productsElem.classList.add('mobile_products');

        productsInTable.forEach(tr => {
            let link = tr.querySelectorAll('a')[1];
            let img = tr.querySelector('img');
            let price = tr.querySelector('td.center').innerHTML;
            let cart = tr.querySelector('.shop_list_buttons');

            let priceElem = document.createElement('span');
            priceElem.classList.add('product_price');
            priceElem.innerHTML = `${price} ₽`;

            let productWrap = document.createElement('div');
            productWrap.classList.add('product_wrap');

            productWrap.append(img);
            productWrap.append(link);
            productWrap.append(priceElem);
            productWrap.append(cart);

            productsElem.append(productWrap);
        })

        const catalogList = document.querySelector('#catalog_list'); 
        catalogList.innerHTML = '';
        catalogList.append(productsElem);
    }

    // Delete category from full backet
    const form = document.querySelector('form table');
    if (form) {
        const basketList = form.querySelectorAll('tbody tr');
        basketList.forEach(tr => {
            tr.removeChild(tr.children[2]);
        })
    }

    //CustomerInfo second table
    const customerInfo = document.querySelectorAll('form table');

    if (customerInfo) {
        secondTable = customerInfo.item(1);
        if (secondTable != null) {
            secondTable.classList.add('customer_info');
            const customerList = secondTable.querySelectorAll('tbody td');
            customerList.forEach(td => {
                if (td.innerHTML === "&nbsp;") {
                    td.remove();
                }
            })
        }
    }

    //Busket is empty
    const componentH1 = document.querySelector('.component h1.con_heading');
    if (componentH1 && componentH1.innerHTML === 'Корзина') {
        const cartForm = document.querySelector('form[name="cartform"]');
        const isBusketEmpty = cartForm && cartForm.querySelector('table') ? false : true;

        if (isBusketEmpty) {
            document.querySelector('#cart_buttons2').style.display='none';

            const returnBtnBlock = document.createElement('div');
            returnBtnBlock.classList.add('returnBtn_block');

            const returnBtn = document.createElement('a');
            returnBtn.innerHTML = `Вернуться`;
            returnBtn.classList.add('return_btn');
            returnBtn.href = "/catalog";
            returnBtn.title = "Вернуться в магазин";

            returnBtnBlock.append(returnBtn);
            const component = document.querySelector('.component');
            component.append(returnBtnBlock);
        } else {

            const spritesBtns = document.querySelector('#cart_buttons');
            spritesBtns.style.display = 'none';
        
            const btnsBlock = document.createElement('div');
            btnsBlock.classList.add('btns_block');
        
            const saveBtn = document.createElement('a');
            saveBtn.innerHTML = `Сохранить`;
            saveBtn.classList.add('save_btn');
            saveBtn.addEventListener('click', saveCart)
            saveBtn.title = "Сохранить";
        
            const clearBtn = document.createElement('a');
            clearBtn.innerHTML = `Отчистить`;
            clearBtn.classList.add('clear_btn');
            clearBtn.addEventListener('click', clearCart)
            clearBtn.title = "Отчистить";
            
            const backBtn = document.createElement('a');
            backBtn.innerHTML = `Вернуться`;
            backBtn.classList.add('back_btn');
            backBtn.onclick = function() {
                document.location.href = "/catalog";
            }
            backBtn.title = "Вернуться в магазин";
        
            const orderBtn = document.createElement('a');
            orderBtn.innerHTML = `Оформить`;
            orderBtn.classList.add('order_btn');
            orderBtn.onclick = function() {
                document.location.href = "/catalog/order.html";
            }
            orderBtn.title = "Оформить заказ";
        
            let listBtns = [saveBtn, clearBtn, backBtn, orderBtn];
            listBtns.forEach(btn => {
                btnsBlock.append(btn);
            })
            const totalAmount = document.querySelector('#cart_total');
            totalAmount.after(btnsBlock);
        }
    }


    // Index - при нажатии на карточку товара, открывается страница товара
    const listItems = document.querySelectorAll('.uc_latest_item');
    if (listItems) {
        //Обернуть весь блок в ссылку
        let $blocks = $('.uc_latest_item');
        let $hrefs = $('#uc_random_cat a');

        $blocks.wrap(function(){
            let $element = $(this);
            let href = $element.find('#uc_random_cat a').attr('href');
            return "<a href="+href+"></a>"
        })
        //Удалить старую ссылку
        listItems.forEach( item => {
            let oldHref = item.querySelector('.lightbox-enabled');
            oldHref.removeAttribute('href');

        })
    }
}

