package com.seb006.server.prfpost.mapper;

import com.seb006.server.prfpost.dto.PrfPostDto;
import com.seb006.server.prfpost.entity.PrfPost;
import com.seb006.server.url.entity.Urls;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PrfPostMapper {

    // PostDto -> Entity
    default PrfPost postDtoToPrfPost(PrfPostDto.Post postDto){
        if(postDto==null){
            return null;
        }
        else{
            PrfPost prfPost = new PrfPost();
            prfPost.setTitle(postDto.getTitle());
            prfPost.setCategory(postDto.getCategory());
            prfPost.setContent(postDto.getContent());
            prfPost.setTags(postDto.getTags());

            if(postDto.getUrls()==null){
                // exception 발생
            }else{
                List<Urls> urls = postDto.getUrls().stream()
                        .map(eachUrl -> {
                            Urls url = new Urls();
                            url.setUrl(eachUrl.getUrl());
                            url.setPrfPost(prfPost);
                            return url;
                        })
                        .collect(Collectors.toList());
                prfPost.setUrls(urls);
            }
            return prfPost;
        }
    }

//    // PatchDto -> Entity
//    default PrfPost patchDtoToPrfPost(PrfPostDto.Patch patchDto){
//
//    }
//    // Entity -> Response
}
