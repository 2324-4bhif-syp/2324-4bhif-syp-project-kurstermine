package at.htl.courseschedule.controller;

import java.util.Arrays;

public final class Util {

    private Util() {}

    public static <T> String getSimilarityString(Class<T> classType, String... members) {
        StringBuilder builder = new StringBuilder();
        builder.append(String.format("from %s ", classType.getName()));

        Arrays.asList(members).forEach(member ->
                builder.append(String.format(
                        "where word_similarity(%s, cast(:pattern as character(255))) > :minEntropy ", member)
                )
        );

        Arrays.asList(members).forEach(member ->
                builder.append(String.format(
                        "order by word_similarity(%s, cast(:pattern as character(255))) desc", member)
                )
        );

        return builder.toString();
    }
}
