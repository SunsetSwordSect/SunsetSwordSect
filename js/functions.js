        //FUNCTIONS

        //NAV BAR RELATED FUNCTIONS

        
        //CLOUD ANIMATION RELATED
        //Calculates the center of the given element
        // @param item - the element being operated on
        // @return center - an array containing the coordinates of the center
        function calculateCenter(itemName){
            let item = document.getElementById(itemName);
            let width,height,center;
            center = new Array(2);
            width = item.width; height = item.height;
            center[x] = item.x + width/2;
            center[y] = item.y + height/2;
            return center;
        }

        function getSunPos(sunName){
            let sun = document.getElementById(sunName);
            console.log("92. X:",sun.x,"\nY:",sun.y);
            console.log("93. height",sun.height,"\nwidth:",sun.width);
            console.log("110.",center);
        }

        function setCursorStartPosition(){
            cursorDot.style.left = center[x];
            cursorDot.style.top =  center[y];
        
            cursorOutline.style.left = center[x];
            cursorOutline.style.top = center[y];
        }

        // function set_cloud_pos(class_name,sunName){
        //     let points = get_sun_side_points(sunName,0.3,"left");
        //     set_pos_based_center(class_name,points[1]);
        // }

        function get_sun_side_points(sunName,scale,side){
            let sun = document.getElementById(sunName);
            let yPos;
            let height = sun.height;
            let step = height*scale;
            let size = calculateFragments(scale);
            console.log("161. size",size);
            let points = new Array(size);

            switch(side){
                case("left"):
                    for(let i=1; i<=size; i++){
                        yPos = sun.y+(step*i);   
                        points[i-1] = [sun.x,yPos];
                    }
                    return points;
            }
        }

        function set_clouds_position(clouds_name,clouds_align,sunName){
            let id,align;
            // console.log("#230 \t",clouds_name,"\n",clouds_align);
            for(let i=0; i<clouds_name.length;i++){
                id = clouds_name[i];
                align = clouds_align[i];
                set_cloud_pos(id,align,sunName);
            }
        }

        
        function set_cloud_pos(id,align,sunName){
            let split = 0.3;
            let points = get_sun_points(sun,split,align);
            set_pos_based_center(id,points[1]);
        }

        function get_sun_points(sunName,split,align){
            let sun = document.getElementById(sunName);
            let yPos,xPos;
            let height = sun.height;
            let step = height*split;
            let size = calculateFragments(split); // Fix
            let points = new Array(size);

            switch(align){
                case("left"):
                    for(let i=1; i<=size; i++){
                            yPos = sun.y+(step*i);   
                            points[i-1] = [sun.x,yPos];
                    }
                    return points;
                    break;

                case("right"):
                    for(let i=1; i<=size; i++){
                        yPos = sun.y+(step*i);
                        xPos = sun.x+sun.width;
                        points[i-1] = [xPos,yPos];
                    }
                    return points;
                    break;
            }
        }

        
        function calculateFragments(scale){
            let num = scale*10;
            let denum = 10;
            if(denum%num == 0){
                return denum/num;
            }
            let step = 2;
            while(step < num && num != 1){
                if(num%step == 0 && denum%step ==0){
                    while(num%step == 0 && denum%step == 0){
                        num = num/step;
                        denum = denum/step;
                    }
                }
                step++;
            }
            if(denum == 10 && num <5)
                return parseInt(denum/num); 
            return denum;
        }

        
        function set_pos_based_center(id,pos){
            let cloud = document.getElementById(id);
            let height = cloud.height;
            let width = cloud.width;
            cloud.style.left = pos[x]-(width/2);
            cloud.style.top = pos[y]-(height/2);
        }
        
        function transform_clouds(clouds_name, clouds_align,eventData){
            let cloud,step;
            let e = eventData;
            for(let i =0; i < clouds_name.length;i++){
                cloud = document.getElementById(clouds_name[i]);
                step = cloud.width/5;
                if(e.wheelDelta <0){    
                    switch(clouds_align[i]){
                        case "right":
                            cloud.style.transform = "translateX("+step+"px)";
                            break;
                        case "left":
                            cloud.style.transform = "translateX(-"+step+"px)";
                            break;
                    }
                }else{
                    cloud.style.transform = "translateX(0px)";
                }
            }
        }

        //TRANSFORM FUNCTIONS
        

        function initialiseTransformEnd(transforms){
            let class_names = new Array(transforms.length);
            for(let i =1; i<transforms.length; i++){
                class_names[i] = document.querySelectorAll("."+transforms[i]);
                class_names[i][0].addEventListener("transitionend",function(e){
                    console.log(e.target.className);
                });
            }
        }

        function determineStage(lastDir,stage,eventData){
            let e = eventData;
            switch(lastDir){
                case 'n':
                    // console.log("case n");
                    if(e.wheelDelta <0){
                        lastDir='d';
                    }
                    return [stage,lastDir];
                    break;
                case 'd':
                    // console.log("case d");
                    if(e.wheelDelta <0){
                        if(stage < max_scroll)
                            stage++;
                        lastDir='d';
                    }else{
                        lastDir='u';
                    }
                    return [stage,lastDir];
                    break;
                case 'u':
                    // console.log("case u");
                    if(e.wheelDelta <0){
                        lastDir='d';
                    }else{
                        lastDir ='u';
                        if( stage >= 0)
                            stage-- ;
                    }
                    return [stage,lastDir];
                    break;
            }
        }

        function setCurrentPage(currentPage, pages){
            let pageData;
            for(let i=1; i<pages.length;i++){
                pageData = document.getElementById(pages[i]);
                if(currentPage == i){
                    pageData.style.display="flex";
                }
            }
        }

        function pageTransition(currentPage, pages){
            let pageData;
            for(let i=1; i<pages.length;i++){
                if(i == currentPage){
                    pageData = document.getElementById(pages[i]);
                    pageData.style.transform = "translateY(100%);"
                }
            }
        } 

        function translateTestSlide(eventData){
            let e=eventData;
            let test = document.getElementById("test_slide");
            if(e.wheelDelta <0){
                test.style.transform="translateY(-100%)";
                // when animation finishes.

                test.style.display="none";
            }else{
                test.style.transform="translateY(100%)";
            }
        }


        //SET PAGE
        function setPage(page,curr){
            for(let i =1;i<page.length;i++){
                if(i != curr){
                    document.getElementById(page[i]).style.display = "none";
                }
                else{
                    document.getElementById(page[i]).style.display = "flex";
                }
            }
        }


        //ANIMATIONS

        function toggleAnimations(elementName,animeName,){
            let element = document.getElementById(elementName);
            element.classList.add(animeName);
            element.addEventListener("animationend",function(){
                element.classList.remove(animeName);
            });
        }

        function toggleAnimationsSubComponent(elementName,animeName,sub_class_name){
            let element = document.querySelector('#'+elementName+" ."+sub_class_name);
            element.classList.add(animeName);
            element.addEventListener("animationend",function(){
                element.classList.remove(animeName);
            });
        }

        function animationToNewPage(elementName,animeName,pages,curr){
            let element = document.getElementById(elementName);
            let curr_page = document.getElementById(pages[curr]);
            let color = curr_page.style.backgroundColor;

            element.style.backgroundColor = color;
            element.classList.add(animeName);
            element.addEventListener("animationend",function(){
                setPage(pages,curr);
                element.classList.remove(animeName);
            });
        }

        function animationToNewPagePlus(elementName, animeName, pages, curr,plusName){
            let element = document.getElementById(elementName);
            let curr_page = document.getElementById(pages[curr]);
            let color = curr_page.style.backgroundColor;

            element.style.backgroundColor = color;
            element.classList.add(animeName);
            element.addEventListener("animationend",function(){
                setPage(pages,curr);
                toggleAnimations(pages[curr],plusName)
                element.classList.remove(animeName);
            });
        }

        function animationToNewPagePlusSubcomponent(elementName, animeName, pages, curr,plusName,subClass){
            let element = document.getElementById(elementName);
            let curr_page = document.getElementById(pages[curr]);
            let color = curr_page.style.backgroundColor;

            element.style.backgroundColor = color;
            element.classList.add(animeName);
            element.addEventListener("animationend",function(){
                setPage(pages,curr);
                toggleAnimationsSubComponent(pages[curr],plusName,subClass);
                element.classList.remove(animeName);
            });
        }

        function getDirection(id){
            let names = id.split("_");
            let direction = "none";

            for(let i =0; i<names.length; i++){
                if(names[i] == "right" || names[i] == "left"){
                    direction = names[i];
                    return direction;
                }
            }
            return direction;
        }

        function performTransform(id){
            let direction = getDirection(id);
            let item = document.getElementById(id);
            let width = item.width;

            if(direction == "none"){
                console.log("No direction");
                return;
            }

            switch(direction){
                case "right":
                    item.style.transform = "translateX("+width+"px)";
                    break;
                case "left":
                    item.style.transform = "translateX(-"+width+"px)";
                    break;
            }
        }

        function performTransformMultiple(ids){
            for(let i=0; i<ids.length; i++)
                performTransform(ids[i]);
        }

        function setAnimationEnd(id){
            let item = document.getElementById(id);
            item.addEventListener("animationend", function(e){
                setDisplayNone(e.target.id);
                document.body.style.overflowX = "auto";
                document.body.style.overflowY = "auto";

                document.querySelector(".nav").style.opacity= "1";
                document.querySelector(".nav-background").style.opacity = "0.55";
            });
        }

        function setDisplayNone(id){
            let item = document.getElementById(id);
            item.style.display = "none";
        }

        function setMultipleAnimationEnd(ids){
            for(let i=0;i<ids.length;i++){
                setAnimationEnd(ids[i]);
            }       
        }

        function setGalleryOnClick(){
            let gallery = document.querySelectorAll(".gallery-area img");
            let close_button = document.querySelector("#image-viewer-close p");

            for(let i =0; i < gallery.length;i++){
                gallery[i].addEventListener("click",function(e){
                    display_from_gallery(e);
                });
            }

            close_button.addEventListener("click",function(e){
                close_gallery_image(e);
            });
        }

        function display_from_gallery(eventData){
            let item_src = eventData.target.src;
            let image_viewer = document.getElementById("image-viewer");
            let image_viewer_background = document.getElementById("image-viewer-background");
            let image_holder = document.getElementById("image-holder");

            
            image_viewer.style.display="flex";
            image_viewer_background.style.display = "flex";
            // image_viewer.innerHTML += "<img src='"+item_src+"'>";
            image_holder.src = item_src;
            //document.getElementById("image-viewer").innerHTML = "<img src='https://i.imgur.com/X3mA3q7.jpeg'>"
        }


        function close_gallery_image(){
            let image_viewer = document.getElementById("image-viewer");
            let image_viewer_background = document.getElementById("image-viewer-background");

            image_viewer.style.display = "none";
            image_viewer_background.style.display = "none";
        }


        